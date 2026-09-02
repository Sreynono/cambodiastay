import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'; 
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto'; 
import { UpdateUserDto } from './dto/update-user.dto'; // <-- FIX 2: Added missing import
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, 
  ) {}

  // ==========================================
  // 1. REGISTRATION LOGIC
  // ==========================================
  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password_raw, full_name, role, phone_number } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password_raw, saltRounds);

    const newUser = this.usersRepository.create({
      email,
      password_hash,
      full_name,
      role,
      phone_number,
    });

    return await this.usersRepository.save(newUser);
  }

  // ==========================================
  // 2. LOGIN LOGIC
  // ==========================================
  async loginUser(loginDto: LoginDto) {
    const { email, password_raw } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password_raw, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { 
      sub: user.user_id, 
      email: user.email, 
      role: user.role 
    };
    
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: access_token,
      user_info: {
        id: user.user_id,
        name: user.full_name,
        role: user.role
      }
    };
  }

  // ==========================================
  // 3. PROFILE MANAGEMENT LOGIC
  // ==========================================
  
  async getUserById(user_id: number) {
    const user = await this.usersRepository.findOne({ 
      where: { user_id },
      // <-- FIX 1: Updated to the new TypeORM v0.3 object syntax
      select: {
        user_id: true,
        email: true,
        full_name: true,
        phone_number: true,
        role: true,
        is_verified: true,
        created_at: true
      } 
    });
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async updateUserProfile(user_id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(user_id, updateUserDto);
    return this.getUserById(user_id); 
  }
}