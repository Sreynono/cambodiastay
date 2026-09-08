import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  GUEST = 'guest',
  HOST = 'host'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 150 })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'varchar' })
  password_hash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GUEST })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
