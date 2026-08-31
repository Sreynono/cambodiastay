import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  password_raw: string; // We call it raw because the user types it in plain text
  full_name: string;
  role: UserRole;
  phone_number?: string;
}