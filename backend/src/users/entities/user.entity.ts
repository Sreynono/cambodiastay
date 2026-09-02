import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

// This enum strictly enforces the roles defined in your project scope
export enum UserRole {
  GUEST = 'Guest',
  HOST = 'Host',
  ADMIN = 'Admin',
}

@Entity('Users') // This tells TypeORM to connect to your existing 'Users' table
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ default: false })
  is_verified: boolean;

  @CreateDateColumn()
  created_at: Date;
}