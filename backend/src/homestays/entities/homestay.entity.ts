import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum HomestayStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Entity('homestays')
export class Homestay {
  @PrimaryGeneratedColumn()
  homestay_id: number;

  @Column()
  host_id: number;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100 })
  province: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price_per_night: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  landscape?: string;

  @Column({ type: 'enum', enum: HomestayStatus, default: HomestayStatus.PENDING })
  status: HomestayStatus;

  @Column({ nullable: true })
  image_url?: string;

  @Column({ type: 'text', nullable: true })
  gallery_photos?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  video_url?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  payment_qr_url?: string;

  @Column({ type: 'text', nullable: true })
  host_bio?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  host_avatar_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  host_languages?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  host_response_time?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  host_phone?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  district?: string;

  @Column({ type: 'text', nullable: true })
  address_directions?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  near_places?: string;

  @CreateDateColumn()
  created_at: Date;

  // Helper getters for frontend compatibility
  get id(): number {
    return this.homestay_id;
  }

  get name(): string {
    return this.title;
  }

  get price(): number {
    return Number(this.price_per_night);
  }

  get coverPhotoUrl(): string {
    return this.image_url || '';
  }
}
