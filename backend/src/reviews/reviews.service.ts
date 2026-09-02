import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Booking, BookingStatus } from '../bookings/entities/booking.entity'; // Import Booking features
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>, // Inject Bookings Repository
  ) {}

  async create(guest_id: number, createReviewDto: CreateReviewDto) {
    const { booking_id, rating, comment } = createReviewDto;

    // 1. Find the specific booking
    const booking = await this.bookingsRepository.findOne({ where: { booking_id } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // 2. Security Check: Did THIS guest make THIS booking?
    if (booking.guest_id !== guest_id) {
      throw new BadRequestException('You can only review your own bookings');
    }

    // 3. Status Check: Is the stay actually finished?
    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException('You can only review completed stays');
    }

    // 4. Validate rating math
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // 5. If it passes all checks, save the review!
    const newReview = this.reviewsRepository.create({
      booking_id,
      guest_id,
      rating,
      comment,
    });

    return await this.reviewsRepository.save(newReview);
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
