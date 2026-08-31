import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Homestay } from '../../homestays/entities/homestay.entity';

// Enforcing the exact statuses you defined in your MySQL database
export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

@Entity('Bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column()
  guest_id: number;

  @Column()
  homestay_id: number;

  // 1. Link to the Guest who made the booking
  @ManyToOne(() => User)
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  // 2. Link to the Homestay being booked
  @ManyToOne(() => Homestay)
  @JoinColumn({ name: 'homestay_id' })
  homestay: Homestay;

  @Column({ type: 'date' })
  check_in_date: string;

  @Column({ type: 'date' })
  check_out_date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @CreateDateColumn()
  created_at: Date;
}