import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password_raw: string;

  @IsNotEmpty()
  full_name: string;

  @IsEnum(UserRole, { message: 'Invalid role selected' })
  role: UserRole;

  @IsOptional()
  phone_number?: string;
}
