import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Homestay } from '../../homestays/entities/homestay.entity';

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column()
  guest_id: number;

  @Column()
  homestay_id: number;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  @ManyToOne(() => Homestay, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'homestay_id' })
  homestay: Homestay;

  @Column({ type: 'date' })
  check_in_date: string;

  @Column({ type: 'date' })
  check_out_date: string;

  @Column({ type: 'int', default: 1 })
  guests_count: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @CreateDateColumn()
  created_at: Date;

  get id(): number {
    return this.booking_id;
  }
}