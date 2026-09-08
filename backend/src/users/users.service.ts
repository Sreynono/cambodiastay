import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'; 
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, 
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password_raw, full_name, role, phone_number } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password_raw, saltRounds);

    let normalizedRole = UserRole.GUEST;
    const r = (role || '').toLowerCase();
    if (r === 'host') normalizedRole = UserRole.HOST;
    else if (r === 'admin') normalizedRole = UserRole.ADMIN;

    const newUser = this.usersRepository.create({
      email,
      password_hash,
      full_name,
      role: normalizedRole,
      phone_number,
    });

    return await this.usersRepository.save(newUser);
  }

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

    const roleLower = (user.role || 'guest').toLowerCase();
    const payload = { 
      sub: user.user_id, 
      email: user.email, 
      role: roleLower 
    };
    
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: access_token,
      user_info: {
        id: user.user_id,
        email: user.email,
        name: user.full_name,
        role: roleLower
      }
    };
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      order: { user_id: 'DESC' },
    });
    return users.map((u) => ({
      id: u.user_id,
      user_id: u.user_id,
      email: u.email,
      name: u.full_name || 'User',
      full_name: u.full_name || 'User',
      role: (u.role || 'guest').toLowerCase(),
      status: u.is_verified ? 'Active' : 'Active',
      phone: u.phone_number,
      phone_number: u.phone_number,
      created_at: u.created_at,
    }));
  }

  async getUserById(user_id: number) {
    const user = await this.usersRepository.findOne({ 
      where: { user_id },
    });
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.user_id,
      user_id: user.user_id,
      email: user.email,
      name: user.full_name,
      full_name: user.full_name,
      phone: user.phone_number,
      phone_number: user.phone_number,
      role: (user.role || 'guest').toLowerCase(),
      is_verified: user.is_verified,
      created_at: user.created_at,
    };
  }

  async updateUserProfile(user_id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(user_id, updateUserDto);
    return this.getUserById(user_id); 
  }

  async updateUserRole(user_id: number, role: string) {
    let normalizedRole = UserRole.GUEST;
    const r = (role || '').toLowerCase();
    if (r === 'host') normalizedRole = UserRole.HOST;
    else if (r === 'admin') normalizedRole = UserRole.ADMIN;

    await this.usersRepository.update(user_id, { role: normalizedRole });
    return this.getUserById(user_id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email: email.trim().toLowerCase() } });
  }

  async generateTokenForUser(userId?: number, email?: string) {
    let user: User | null = null;
    if (userId) {
      user = await this.usersRepository.findOne({ where: { user_id: Number(userId) } });
    } else if (email) {
      user = await this.usersRepository.findOne({ where: { email: email.trim().toLowerCase() } });
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const roleLower = (user.role || 'guest').toLowerCase();
    const payload = {
      sub: user.user_id,
      email: user.email,
      role: roleLower,
    };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      accessToken: access_token,
      user_info: {
        id: user.user_id,
        email: user.email,
        name: user.full_name,
        role: roleLower,
      },
    };
  }

  async deleteUser(user_id: number) {
    const user = await this.usersRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException(`User #${user_id} not found`);
    }
    await this.usersRepository.delete(user_id);
    return { message: `User #${user_id} deleted successfully.` };
  }
}
