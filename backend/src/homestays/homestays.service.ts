import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homestay, HomestayStatus } from './entities/homestay.entity';
import { Review } from '../reviews/entities/review.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class HomestaysService {
  constructor(
    @InjectRepository(Homestay)
    private homestaysRepository: Repository<Homestay>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async getHomestayRatings(): Promise<Map<number, { avgRating: number; count: number }>> {
    const ratingsMap = new Map<number, { avgRating: number; count: number }>();
    try {
      const stats = await this.reviewsRepository
        .createQueryBuilder('review')
        .leftJoin('review.booking', 'booking')
        .select('COALESCE(review.homestay_id, booking.homestay_id)', 'homestay_id')
        .addSelect('AVG(review.rating)', 'avg_rating')
        .addSelect('COUNT(review.review_id)', 'review_count')
        .where('COALESCE(review.homestay_id, booking.homestay_id) IS NOT NULL')
        .groupBy('COALESCE(review.homestay_id, booking.homestay_id)')
        .getRawMany();

      for (const stat of stats) {
        if (stat.homestay_id) {
          ratingsMap.set(Number(stat.homestay_id), {
            avgRating: Number(Number(stat.avg_rating).toFixed(1)),
            count: Number(stat.review_count),
          });
        }
      }
    } catch {
      // Gracefully fall back to empty map if reviews table is empty
    }
    return ratingsMap;
  }

  private mapHomestay(h: Homestay, stats?: { avgRating: number; count: number }) {
    let gallery: string[] = [];
    if (h.gallery_photos) {
      try {
        const parsed =
          typeof h.gallery_photos === 'string'
            ? JSON.parse(h.gallery_photos)
            : h.gallery_photos;
        if (Array.isArray(parsed)) {
          gallery = parsed;
        }
      } catch {
        // fallback
      }
    }
    const coverUrl = h.image_url || '';
    const allGallery =
      gallery.length > 0
        ? coverUrl && !gallery.includes(coverUrl)
          ? [coverUrl, ...gallery]
          : gallery
        : coverUrl
          ? [coverUrl]
          : [];

    return {
      id: h.homestay_id,
      homestay_id: h.homestay_id,
      name: h.title,
      title: h.title,
      province: h.province,
      price: Number(h.price_per_night),
      price_per_night: Number(h.price_per_night),
      coverPhotoUrl: coverUrl,
      image_url: coverUrl,
      galleryPhotos: allGallery,
      description: h.description || '',
      status: h.status,
      host_id: h.host_id,
      host: h.host
        ? {
            id: h.host.user_id,
            user_id: h.host.user_id,
            name: h.host.full_name,
            email: h.host.email,
          }
        : undefined,
      rating: stats && stats.count > 0 ? stats.avgRating : 5.0,
      reviewsCount: stats ? stats.count : 0,
      landscape: h.province ? `${h.province} Landscape` : 'Rural Countryside',
      video_url: h.video_url || '',
      videoUrl: h.video_url || '',
      host_bio: h.host_bio || '',
      hostBio: h.host_bio || '',
      host_avatar_url: h.host_avatar_url || '',
      hostAvatarUrl: h.host_avatar_url || '',
      host_languages: h.host_languages || 'Khmer, English',
      hostLanguages: h.host_languages || 'Khmer, English',
      host_response_time: h.host_response_time || 'Within an hour',
      hostResponseTime: h.host_response_time || 'Within an hour',
      host_phone: h.host_phone || '',
      hostPhone: h.host_phone || '',
      created_at: h.created_at,
    };
  }

  async apply(
    body: any,
    fileUrl?: string,
    galleryUrls?: string[],
    videoUrl?: string | null,
    hostAvatarUrl?: string | null,
  ): Promise<any> {
    try {
      const title = body.name || body.title || 'Rural Homestay';
      const province = body.province || 'Siem Reap';
      const price = Number(body.price) || 25;
      const description = body.description || '';
      
      let hostId = body.host_id ? Number(body.host_id) : (body.hostId ? Number(body.hostId) : 0);

      // If no host_id passed, check if applicant email exists in Users table or create applicant
      if (!hostId && body.email) {
        const cleanEmail = body.email.trim().toLowerCase();
        let applicant = await this.usersRepository.findOne({
          where: { email: cleanEmail },
        });
        if (!applicant) {
          const fullName = `${body.firstName || ''} ${body.lastName || ''}`.trim() || 'New Host';
          applicant = this.usersRepository.create({
            email: cleanEmail,
            full_name: fullName,
            phone_number: body.phone || null,
            role: 'guest' as any,
            password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
          });
          applicant = await this.usersRepository.save(applicant);
        }
        hostId = applicant.user_id;
      }

      if (!hostId) {
        // Fall back to first host or admin
        const fallbackUser = await this.usersRepository.findOne({ where: { role: 'host' as any } });
        hostId = fallbackUser ? fallbackUser.user_id : 1;
      }

      const homestay = this.homestaysRepository.create({
        title,
        province,
        price_per_night: price,
        description,
        host_id: hostId,
        image_url: fileUrl || body.photoUrl || undefined,
        gallery_photos: galleryUrls && galleryUrls.length > 0 ? JSON.stringify(galleryUrls) : undefined,
        video_url: videoUrl || body.videoUrl || body.video_url || undefined,
        host_bio: body.host_bio || body.hostBio || undefined,
        host_avatar_url: hostAvatarUrl || body.host_avatar_url || body.hostAvatarUrl || undefined,
        host_languages: body.host_languages || body.hostLanguages || undefined,
        host_response_time: body.host_response_time || body.hostResponseTime || undefined,
        host_phone: body.host_phone || body.hostPhone || body.phone || undefined,
        status: HomestayStatus.PENDING,
      });

      const saved = await this.homestaysRepository.save(homestay);
      const loaded = await this.homestaysRepository.findOne({
        where: { homestay_id: saved.homestay_id },
        relations: { host: true },
      });
      return this.mapHomestay(loaded || saved);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to submit homestay application: ${error.message}`);
    }
  }

  async findAll(query?: any): Promise<any[]> {
    const where: any = {};
    if (query?.status) {
      where.status = query.status;
    }
    if (query?.province) {
      where.province = query.province;
    }
    if (query?.host_id) {
      where.host_id = Number(query.host_id);
    }

    const [homestays, ratingsMap] = await Promise.all([
      this.homestaysRepository.find({
        where,
        relations: { host: true },
        order: { created_at: 'DESC' },
      }),
      this.getHomestayRatings(),
    ]);

    return homestays.map((h) => this.mapHomestay(h, ratingsMap.get(h.homestay_id)));
  }

  async findOne(homestayId: number): Promise<any> {
    const [homestay, ratingsMap] = await Promise.all([
      this.homestaysRepository.findOne({
        where: { homestay_id: homestayId },
        relations: { host: true },
      }),
      this.getHomestayRatings(),
    ]);

    if (!homestay) {
      throw new NotFoundException(`Homestay #${homestayId} not found`);
    }

    return this.mapHomestay(homestay, ratingsMap.get(homestay.homestay_id));
  }

  async createHomestay(hostId: number, data: any): Promise<any> {
    try {
      let galleryJson: string | null = null;
      if (data.galleryPhotos || data.photos) {
        try {
          const list = Array.isArray(data.galleryPhotos || data.photos)
            ? (data.galleryPhotos || data.photos)
            : JSON.parse(data.galleryPhotos || data.photos);
          galleryJson = JSON.stringify(list);
        } catch {
          // ignore
        }
      }

      const newHomestay = this.homestaysRepository.create({
        title: data.name || data.title,
        province: data.province,
        price_per_night: Number(data.price || data.price_per_night) || 25,
        description: data.description,
        host_id: hostId,
        image_url: data.coverPhotoUrl || data.image_url || undefined,
        gallery_photos: galleryJson || undefined,
        video_url: data.videoUrl || data.video_url || undefined,
        host_bio: data.host_bio || data.hostBio || undefined,
        host_avatar_url: data.host_avatar_url || data.hostAvatarUrl || undefined,
        host_languages: data.host_languages || data.hostLanguages || undefined,
        host_response_time: data.host_response_time || data.hostResponseTime || undefined,
        host_phone: data.host_phone || data.hostPhone || undefined,
        status: HomestayStatus.PENDING,
      });

      const saved = await this.homestaysRepository.save(newHomestay);
      const loaded = await this.homestaysRepository.findOne({
        where: { homestay_id: saved.homestay_id },
        relations: { host: true },
      });
      return this.mapHomestay(loaded || saved);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create the homestay listing.');
    }
  }

  async updateStatus(homestayId: number, newStatus: string): Promise<any> {
    const homestay = await this.homestaysRepository.findOne({
      where: { homestay_id: homestayId },
    });

    if (!homestay) {
      throw new NotFoundException(`Homestay #${homestayId} not found`);
    }

    const normalized = newStatus.charAt(0).toUpperCase() + newStatus.slice(1).toLowerCase();
    if (['Pending', 'Approved', 'Rejected'].includes(normalized)) {
      homestay.status = normalized as HomestayStatus;
    }

    const saved = await this.homestaysRepository.save(homestay);

    // If approved, ensure the host user has the 'host' role in users table
    if (homestay.status === HomestayStatus.APPROVED && homestay.host_id) {
      try {
        const hostUser = await this.usersRepository.findOne({ where: { user_id: homestay.host_id } });
        if (hostUser && hostUser.role !== ('admin' as any) && hostUser.role !== ('host' as any)) {
          hostUser.role = 'host' as any;
          await this.usersRepository.save(hostUser);
        }
      } catch {
        // Continue if role already updated
      }
    }

    const loaded = await this.homestaysRepository.findOne({
      where: { homestay_id: saved.homestay_id },
      relations: { host: true },
    });

    return this.mapHomestay(loaded || saved);
  }

  async remove(homestayId: number, hostId?: number): Promise<{ message: string }> {
    const homestay = await this.homestaysRepository.findOne({
      where: { homestay_id: homestayId },
    });

    if (!homestay) {
      throw new NotFoundException(`Homestay #${homestayId} not found`);
    }

    if (hostId && homestay.host_id !== hostId) {
      throw new UnauthorizedException('You can only delete your own homestays.');
    }

    // Cascade delete referencing reviews and bookings first
    try {
      const bookings = await this.bookingsRepository.find({ where: { homestay_id: homestayId } });
      for (const b of bookings) {
        await this.reviewsRepository.delete({ booking_id: b.booking_id });
        await this.bookingsRepository.delete(b.booking_id);
      }
    } catch {
      // Continue to delete homestay
    }

    await this.homestaysRepository.delete(homestayId);
    return { message: `Homestay #${homestayId} successfully deleted.` };
  }
}