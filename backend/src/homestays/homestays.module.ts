import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomestaysController } from './homestays.controller';
import { HomestaysService } from './homestays.service';
import { Homestay } from './entities/homestay.entity';
import { Review } from '../reviews/entities/review.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homestay, Review, Booking, User])],
  controllers: [HomestaysController],
  providers: [HomestaysService],
  exports: [HomestaysService],
})
export class HomestaysModule {}