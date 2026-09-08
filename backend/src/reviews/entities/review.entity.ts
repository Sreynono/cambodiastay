import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Homestay } from '../../homestays/entities/homestay.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column({ nullable: true })
  booking_id?: number;

  @Column({ nullable: true })
  homestay_id?: number;

  @Column()
  guest_id: number;

  // Link to the specific Reservation (optional)
  @ManyToOne(() => Booking, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'booking_id' })
  booking?: Booking;

  // Direct link to the Homestay
  @ManyToOne(() => Homestay, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'homestay_id' })
  homestay?: Homestay;

  // Link to the Guest who wrote the review
  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  @Column({ type: 'int' })
  rating: number; // 1 to 5 stars

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'text', nullable: true })
  recommendation?: string;

  @Column({ type: 'boolean', default: true })
  is_recommended: boolean;

  @CreateDateColumn()
  created_at: Date;
}