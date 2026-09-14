import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Homestay } from '../../homestays/entities/homestay.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guest_id: number;

  @Column()
  host_id: number;

  @Column()
  homestay_id: number;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guest_id', referencedColumnName: 'user_id' })
  guest: User;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'host_id', referencedColumnName: 'user_id' })
  host: User;

  @ManyToOne(() => Homestay, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'homestay_id', referencedColumnName: 'homestay_id' })
  homestay: Homestay;

  @Column({ type: 'text', nullable: true })
  last_message: string;

  @UpdateDateColumn()
  last_message_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
