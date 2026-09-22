import { 
  Injectable, 
  NotFoundException, 
  UnauthorizedException, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { Homestay } from '../homestays/entities/homestay.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    
    @InjectRepository(Homestay)
    private homestaysRepository: Repository<Homestay>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private mapBooking(b: Booking) {
    return {
      id: b.booking_id,
      booking_id: b.booking_id,
      property_id: b.homestay_id,
      homestay_id: b.homestay_id,
      property_name: b.homestay?.title || 'Cambodian Homestay',
      property_image: b.homestay?.image_url || '',
      province: b.homestay?.province || 'Cambodia',
      guest_id: b.guest_id,
      guest_name: b.guest?.full_name || 'Guest Traveler',
      guest_email: b.guest?.email || '',
      check_in_date: b.check_in_date,
      check_out_date: b.check_out_date,
      guests_count: Number(b.guests_count) || 1,
      total_price: Number(b.total_price),
      status: (b.status || 'Pending').toLowerCase(),
      created_at: b.created_at,
    };
  }

  async createBooking(
    guestId: number,
    homestayId: number,
    checkInDate: string,
    checkOutDate: string,
    guestsCount: number = 1,
    customTotalPrice?: number,
    guestEmail?: string,
  ): Promise<any> {
    const homestay = await this.homestaysRepository.findOne({ 
      where: { homestay_id: homestayId } 
    });

    if (!homestay) {
      throw new NotFoundException(`Homestay with ID ${homestayId} not found`);
    }

    let finalGuestId = guestId;
    if (guestEmail) {
      const matchedUser = await this.usersRepository.findOne({
        where: { email: guestEmail.trim().toLowerCase() }
      });
      if (matchedUser) {
        finalGuestId = matchedUser.user_id;
      }
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const numberOfDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const pricePerNight = Number(homestay.price_per_night) || 25;
    const guests = Math.max(1, Number(guestsCount) || 1);
    
    // Direct stay total calculation without cleaning/community fees
    const calculatedTotal = numberOfDays * pricePerNight * guests;
    const finalTotal = (customTotalPrice && customTotalPrice > 0) ? customTotalPrice : calculatedTotal;

    // Check for double-booking collision against active bookings (Pending or Confirmed)
    const overlapping = await this.bookingsRepository
      .createQueryBuilder('booking')
      .where('booking.homestay_id = :homestayId', { homestayId })
      .andWhere('booking.status IN (:...activeStatuses)', {
        activeStatuses: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      })
      .andWhere(
        'booking.check_in_date < :checkOutDate AND booking.check_out_date > :checkInDate',
        {
          checkInDate,
          checkOutDate,
        },
      )
      .getOne();

    if (overlapping) {
      throw new BadRequestException(
        `This homestay is already reserved from ${overlapping.check_in_date} to ${overlapping.check_out_date}. Please select different dates.`,
      );
    }

    const newBooking = this.bookingsRepository.create({
      guest_id: finalGuestId,
      homestay_id: homestayId,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      guests_count: guests,
      total_price: Number(finalTotal.toFixed(2)),
      status: BookingStatus.PENDING, 
    });

    const saved = await this.bookingsRepository.save(newBooking);
    const full = await this.bookingsRepository.findOne({
      where: { booking_id: saved.booking_id },
      relations: { homestay: true, guest: true },
    });

    return this.mapBooking(full || saved);
  }

  async getBookingDetails(bookingId: number): Promise<any> {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: bookingId },
      relations: { homestay: true, guest: true }, 
    });

    if (!booking) {
      throw new NotFoundException(`Booking #${bookingId} not found`);
    }

    return this.mapBooking(booking);
  }

  async getGuestBookings(guestId: number, guestEmail?: string): Promise<any[]> {
    const qb = this.bookingsRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.homestay', 'homestay')
      .leftJoinAndSelect('booking.guest', 'guest')
      .orderBy('booking.created_at', 'DESC');

    if (guestEmail && guestId) {
      qb.where('booking.guest_id = :guestId OR LOWER(guest.email) = :email', {
        guestId,
        email: guestEmail.trim().toLowerCase(),
      });
    } else if (guestEmail) {
      qb.where('LOWER(guest.email) = :email', {
        email: guestEmail.trim().toLowerCase(),
      });
    } else {
      qb.where('booking.guest_id = :guestId', { guestId });
    }

    const bookings = await qb.getMany();
    return bookings.map((b) => this.mapBooking(b));
  }

  async getHostBookings(hostId: number): Promise<any[]> {
    const bookings = await this.bookingsRepository.find({
      relations: { homestay: true, guest: true },
      order: { created_at: 'DESC' },
    });

    const hostBookings = bookings.filter((b) => b.homestay && b.homestay.host_id === hostId);
    return hostBookings.map((b) => this.mapBooking(b));
  }

  async getAllBookings(): Promise<any[]> {
    const bookings = await this.bookingsRepository.find({
      relations: { homestay: true, guest: true },
      order: { created_at: 'DESC' },
    });

    return bookings.map((b) => this.mapBooking(b));
  }

  async manageBooking(bookingId: number, hostId?: number, action?: string, isAdmin: boolean = false): Promise<any> {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: bookingId },
      relations: { homestay: true, guest: true },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found.`);
    }

    if (!isAdmin && hostId && booking.homestay?.host_id && booking.homestay.host_id !== hostId) {
      throw new UnauthorizedException('You do not have permission to manage this reservation.');
    }

    const normAction = (action || '').toLowerCase();
    if (['approved', 'approve', 'confirm', 'confirmed'].includes(normAction)) {
      booking.status = BookingStatus.CONFIRMED;
    } else if (['rejected', 'reject', 'cancel', 'cancelled'].includes(normAction)) {
      booking.status = BookingStatus.CANCELLED;
    } else if (['completed', 'complete'].includes(normAction)) {
      booking.status = BookingStatus.COMPLETED;
    } else {
      throw new BadRequestException('Invalid action. Must be approve, reject, or complete.');
    }

    try {
      const saved = await this.bookingsRepository.save(booking);
      return this.mapBooking(saved);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update the booking status.');
    }
  }

  async cancelBooking(bookingId: number, guestId: number): Promise<any> {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: bookingId },
      relations: { homestay: true, guest: true },
    });

    if (!booking) {
      throw new NotFoundException(`Booking #${bookingId} not found.`);
    }

    if (booking.guest_id !== guestId) {
      throw new UnauthorizedException('You can only cancel your own bookings.');
    }

    booking.status = BookingStatus.CANCELLED;
    const saved = await this.bookingsRepository.save(booking);
    return this.mapBooking(saved);
  }
}