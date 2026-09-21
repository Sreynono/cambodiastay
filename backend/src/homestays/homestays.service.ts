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
            phone: h.host.phone_number || '',
            phone_number: h.host.phone_number || '',
          }
        : undefined,
      rating: stats && stats.count > 0 ? stats.avgRating : 5.0,
      reviewsCount: stats ? stats.count : 0,
      category: h.category || 'Rice Farm',
      landscape: h.landscape || (h.category ? `${h.category} Landscape` : (h.province ? `${h.province} Landscape` : 'Rural Countryside')),
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
      host_phone: h.host_phone || h.host?.phone_number || '',
      hostPhone: h.host_phone || h.host?.phone_number || '',
      district: h.district || '',
      address_directions: h.address_directions || '',
      addressDirections: h.address_directions || '',
      near_places: h.near_places || '',
      nearPlaces: h.near_places
        ? (h.near_places.startsWith('[')
            ? (() => { try { const arr = JSON.parse(h.near_places); return Array.isArray(arr) ? arr : []; } catch { return []; } })()
            : h.near_places.split(',').map((s) => s.trim()).filter(Boolean))
        : [],
      created_at: h.created_at,
    };
  }

  private parseNearPlacesString(val: any): string | undefined {
    if (!val) return undefined;
    if (Array.isArray(val)) {
      return val.filter(Boolean).join(', ');
    }
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (trimmed.startsWith('[')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return parsed.filter(Boolean).join(', ');
          }
        } catch {}
      }
      return trimmed;
    }
    return undefined;
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
        category: body.category || body.landscape || 'Rice Farm',
        landscape: body.landscape || (body.category ? `${body.category} Landscape` : undefined),
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
        district: body.district || undefined,
        address_directions: body.address_directions || body.addressDirections || body.directions || undefined,
        near_places: this.parseNearPlacesString(body.near_places || body.nearPlaces),
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
    if (query?.category) {
      where.category = query.category;
    }
    if (query?.landscape) {
      where.landscape = query.landscape;
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
        category: data.category || data.landscape || 'Rice Farm',
        landscape: data.landscape || (data.category ? `${data.category} Landscape` : undefined),
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
        district: data.district || undefined,
        address_directions: data.address_directions || data.addressDirections || data.directions || undefined,
        near_places: this.parseNearPlacesString(data.near_places || data.nearPlaces),
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

  async update(
    homestayId: number,
    hostId: number | undefined,
    data: any,
    files?: Express.Multer.File[],
  ): Promise<any> {
    const homestay = await this.homestaysRepository.findOne({
      where: { homestay_id: homestayId },
      relations: { host: true },
    });

    if (!homestay) {
      throw new NotFoundException(`Homestay #${homestayId} not found`);
    }

    if (hostId && homestay.host_id !== hostId) {
      throw new UnauthorizedException('You can only edit your own homestays.');
    }

    if (data.name !== undefined || data.title !== undefined) {
      homestay.title = data.name || data.title;
    }
    if (data.province !== undefined) {
      homestay.province = data.province;
    }
    if (data.price !== undefined || data.price_per_night !== undefined) {
      homestay.price_per_night = Number(data.price || data.price_per_night) || homestay.price_per_night;
    }
    if (data.category !== undefined || data.landscape !== undefined) {
      homestay.category = data.category || data.landscape || homestay.category;
      homestay.landscape = data.landscape || (data.category ? `${data.category} Landscape` : homestay.landscape);
    }
    if (data.description !== undefined) {
      homestay.description = data.description;
    }
    if (data.district !== undefined) {
      homestay.district = data.district;
    }
    if (data.address_directions !== undefined || data.addressDirections !== undefined || data.directions !== undefined) {
      homestay.address_directions = data.address_directions || data.addressDirections || data.directions;
    }
    if (data.near_places !== undefined || data.nearPlaces !== undefined) {
      homestay.near_places = this.parseNearPlacesString(data.near_places || data.nearPlaces);
    }
    if (data.host_bio !== undefined || data.hostBio !== undefined) {
      homestay.host_bio = data.host_bio || data.hostBio;
    }
    if (data.host_phone !== undefined || data.hostPhone !== undefined || data.phone !== undefined) {
      homestay.host_phone = data.host_phone || data.hostPhone || data.phone;
    }
    if (data.host_languages !== undefined || data.hostLanguages !== undefined) {
      homestay.host_languages = data.host_languages || data.hostLanguages;
    }
    if (data.host_response_time !== undefined || data.hostResponseTime !== undefined) {
      homestay.host_response_time = data.host_response_time || data.hostResponseTime;
    }
    if (data.video_url !== undefined || data.videoUrl !== undefined) {
      homestay.video_url = data.video_url || data.videoUrl;
    }

    // Process files if provided
    if (files && files.length > 0) {
      const coverFile =
        files.find((f) => f.fieldname === 'coverPhoto' || f.fieldname === 'photo') ||
        files.find((f) => f.fieldname !== 'video' && f.fieldname !== 'hostAvatar' && f.fieldname !== 'hostPhoto' && f.fieldname !== 'photos');
      if (coverFile) {
        homestay.image_url = `http://localhost:3000/uploads/${coverFile.filename}`;
      }

      const hostAvatarFile = files.find((f) => f.fieldname === 'hostAvatar' || f.fieldname === 'hostPhoto');
      if (hostAvatarFile) {
        homestay.host_avatar_url = `http://localhost:3000/uploads/${hostAvatarFile.filename}`;
      }

      const videoFile = files.find((f) => f.fieldname === 'video');
      if (videoFile) {
        homestay.video_url = `http://localhost:3000/uploads/${videoFile.filename}`;
      }

      const galleryFiles = files.filter(
        (f) =>
          f !== coverFile &&
          f !== hostAvatarFile &&
          f !== videoFile &&
          (f.fieldname === 'photos' || f.fieldname === 'galleryPhotos'),
      );
      if (galleryFiles.length > 0) {
        const newUploadedUrls = galleryFiles.map((f) => `http://localhost:3000/uploads/${f.filename}`);
        let existingGallery: string[] = [];
        if (data.gallery_photos || data.galleryPhotos) {
          try {
            existingGallery = typeof (data.gallery_photos || data.galleryPhotos) === 'string'
              ? JSON.parse(data.gallery_photos || data.galleryPhotos)
              : (data.gallery_photos || data.galleryPhotos);
          } catch {
            existingGallery = [];
          }
        }
        homestay.gallery_photos = JSON.stringify([...existingGallery, ...newUploadedUrls]);
      }
    } else {
      if (data.coverPhotoUrl !== undefined || data.photoUrl !== undefined || data.image_url !== undefined) {
        const pUrl = data.coverPhotoUrl || data.photoUrl || data.image_url;
        if (pUrl) homestay.image_url = pUrl;
      }
      if (data.gallery_photos !== undefined || data.galleryPhotos !== undefined) {
        const rawGal = data.gallery_photos || data.galleryPhotos;
        homestay.gallery_photos = typeof rawGal === 'string' ? rawGal : JSON.stringify(rawGal);
      }
      if (data.host_avatar_url !== undefined || data.hostAvatarUrl !== undefined) {
        homestay.host_avatar_url = data.host_avatar_url || data.hostAvatarUrl;
      }
    }

    const saved = await this.homestaysRepository.save(homestay);
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