import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum HomestayStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Entity('Homestays')
export class Homestay {
  @PrimaryGeneratedColumn()
  homestay_id: number;

  // This links directly to the user_id in the Users table
  @Column()
  host_id: number;

  // This tells TypeORM how the tables are related
  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  province: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price_per_night: number;

  @Column({ type: 'enum', enum: HomestayStatus, default: HomestayStatus.PENDING })
  status: HomestayStatus;

  @Column({ nullable: true })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  
}