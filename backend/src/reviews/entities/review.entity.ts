import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity'; // <-- Importing Booking instead of Homestay!

@Entity('Reviews')
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  booking_id: number; // <-- Matching your MySQL table!

  @Column()
  guest_id: number;

  // Link to the specific Reservation
  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  // Link to the Guest who wrote the review
  @ManyToOne(() => User)
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  @Column({ type: 'int' })
  rating: number; // 1 to 5 stars

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}