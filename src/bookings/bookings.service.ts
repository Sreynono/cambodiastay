import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Homestay } from 'src/homestays/entities/homestay.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Booking } from './entities/booking.entity';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingStatus } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Homestay)
    private homestaysRepository: Repository<Homestay>, 
  ) {}

  async create(guest_id: number, createBookingDto: CreateBookingDto) {
    const { homestay_id, check_in_date, check_out_date } = createBookingDto;

    // 1. Find the homestay to ensure it exists and get its price
    const homestay = await this.homestaysRepository.findOne({ where: { homestay_id } });
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }

    // 2. Calculate the number of days between check-in and check-out
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (numberOfDays <= 0) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    // 3. Calculate the total price securely on the backend
    const total_price = numberOfDays * homestay.price_per_night;

    // 4. Create and save the booking
    const newBooking = this.bookingsRepository.create({
      guest_id,
      homestay_id,
      check_in_date,
      check_out_date,
      total_price, // Automatically generated!
    });

    return await this.bookingsRepository.save(newBooking);
  }


  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }

  // ==========================================
  // HOST BOOKING MANAGEMENT
  // ==========================================
  
  async updateStatus(booking_id: number, user_id: number, updateBookingStatusDto: UpdateBookingStatusDto) {
    // 1. Find the booking and pull in the homestay data
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id },
      relations: { homestay: true } // We need this to check who owns the homestay!
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // 2. Security Check: Does the logged-in user own this specific homestay?
    if (booking.homestay.host_id !== user_id) {
      throw new UnauthorizedException('You do not have permission to manage this booking');
    }

    // 3. Update the status and save
    booking.status = updateBookingStatusDto.status;
    return await this.bookingsRepository.save(booking);
  }
}
