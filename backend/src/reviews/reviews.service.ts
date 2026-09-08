import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Booking, BookingStatus } from '../bookings/entities/booking.entity';
import { Homestay } from '../homestays/entities/homestay.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Homestay)
    private homestaysRepository: Repository<Homestay>,
  ) {}

  async create(guest_id: number, createReviewDto: CreateReviewDto) {
    const { booking_id, homestay_id, rating, comment, recommendation, is_recommended } = createReviewDto;

    let targetHomestayId = homestay_id ? Number(homestay_id) : undefined;
    let targetBooking: Booking | null = null;

    if (booking_id) {
      targetBooking = await this.bookingsRepository.findOne({ 
        where: { booking_id: Number(booking_id) },
        relations: { homestay: true }
      });
      if (targetBooking) {
        targetHomestayId = targetHomestayId || targetBooking.homestay_id;
      }
    }

    if (!targetHomestayId && targetBooking) {
      targetHomestayId = targetBooking.homestay_id;
    }

    if (!targetHomestayId) {
      throw new BadRequestException('Homestay ID is required to post a review');
    }

    const homestay = await this.homestaysRepository.findOne({ where: { homestay_id: targetHomestayId } });
    if (!homestay) {
      throw new NotFoundException(`Homestay #${targetHomestayId} not found`);
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      throw new BadRequestException('Rating must be an integer between 1 and 5');
    }

    // Auto-complete confirmed booking when reviewed
    if (targetBooking && targetBooking.status === BookingStatus.CONFIRMED) {
      targetBooking.status = BookingStatus.COMPLETED;
      await this.bookingsRepository.save(targetBooking);
    }

    const isRec = is_recommended !== undefined ? Boolean(is_recommended) : (ratingNum >= 4);

    // If a review already exists for this booking or homestay by this guest, update it
    let review: Review | null = null;
    if (booking_id) {
      review = await this.reviewsRepository.findOne({ where: { booking_id: Number(booking_id), guest_id } });
    }
    if (!review && targetHomestayId) {
      review = await this.reviewsRepository.findOne({ where: { homestay_id: targetHomestayId, guest_id } });
    }

    if (review) {
      review.rating = Math.round(ratingNum);
      review.comment = comment ? comment.trim() : '';
      review.recommendation = recommendation ? recommendation.trim() : (review.recommendation || '');
      review.is_recommended = isRec;
      if (targetHomestayId) review.homestay_id = targetHomestayId;
      if (booking_id) review.booking_id = Number(booking_id);
      return await this.reviewsRepository.save(review);
    }

    const newReview = this.reviewsRepository.create({
      booking_id: booking_id ? Number(booking_id) : undefined,
      homestay_id: targetHomestayId,
      guest_id,
      rating: Math.round(ratingNum),
      comment: comment ? comment.trim() : '',
      recommendation: recommendation ? recommendation.trim() : '',
      is_recommended: isRec,
    });

    return await this.reviewsRepository.save(newReview);
  }

  async findByHomestay(homestayId: number): Promise<any[]> {
    const reviews = await this.reviewsRepository
      .createQueryBuilder('review')
      .leftJoin('review.booking', 'booking')
      .leftJoinAndSelect('review.guest', 'guest')
      .where('review.homestay_id = :homestayId OR booking.homestay_id = :homestayId', { homestayId })
      .orderBy('review.created_at', 'DESC')
      .getMany();

    return reviews.map((r) => ({
      id: r.review_id,
      review_id: r.review_id,
      booking_id: r.booking_id,
      homestay_id: r.homestay_id,
      guest_id: r.guest_id,
      guest_name: r.guest?.full_name || 'Guest Traveler',
      guest_email: r.guest?.email || '',
      rating: Number(r.rating),
      comment: r.comment || '',
      recommendation: r.recommendation || '',
      is_recommended: r.is_recommended !== false,
      created_at: r.created_at,
    }));
  }

  async findByGuest(guestId: number): Promise<any[]> {
    const reviews = await this.reviewsRepository.find({
      where: { guest_id: guestId },
      relations: { booking: true },
      order: { created_at: 'DESC' },
    });

    return reviews.map((r) => ({
      id: r.review_id,
      review_id: r.review_id,
      booking_id: r.booking_id,
      homestay_id: r.homestay_id,
      guest_id: r.guest_id,
      rating: Number(r.rating),
      comment: r.comment || '',
      recommendation: r.recommendation || '',
      is_recommended: r.is_recommended !== false,
      created_at: r.created_at,
    }));
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find({
      relations: { guest: true, booking: true },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { review_id: id },
      relations: { guest: true, booking: true },
    });

    if (!review) {
      throw new NotFoundException(`Review #${id} not found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    if (updateReviewDto.rating !== undefined) {
      review.rating = updateReviewDto.rating;
    }
    if (updateReviewDto.comment !== undefined) {
      review.comment = updateReviewDto.comment;
    }
    return await this.reviewsRepository.save(review);
  }

  async remove(id: number): Promise<{ message: string }> {
    const review = await this.findOne(id);
    await this.reviewsRepository.delete(review.review_id);
    return { message: `Review #${id} successfully removed` };
  }
}
