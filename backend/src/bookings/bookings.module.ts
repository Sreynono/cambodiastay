import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { Homestay } from '../homestays/entities/homestay.entity';

@Module({
  // 2. Add TypeOrmModule to the imports array
  imports: [TypeOrmModule.forFeature([Booking, Homestay])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}