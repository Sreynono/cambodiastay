import { Controller, Post, Body, Get, Patch, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto'; 
import { UpdateUserDto } from './dto/update-user.dto'; // 1. Import the new DTO

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.loginUser(loginDto);
  }

  // ==========================================
  // PROTECTED ROUTES (Requires Token)
  // ==========================================
  
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    // req.user.userId comes from the decoded token in your jwt.strategy.ts
    return this.usersService.getUserById(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile') // Use PATCH for updating existing data
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserProfile(req.user.userId, updateUserDto);
  }
}