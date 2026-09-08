import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: any) {
    try {
      const createUserDto = {
        email: body.email?.trim()?.toLowerCase(),
        password_raw: body.password_raw || body.password,
        full_name: body.full_name || body.name || '',
        role: body.role || 'guest',
        phone_number: body.phone_number || body.phone || '',
      };
      
      const user = await this.usersService.registerUser(createUserDto);
      const userInfo = {
        id: user.user_id,
        email: user.email,
        name: user.full_name,
        role: (user.role || 'guest').toLowerCase(),
      };
      return { 
        message: 'Registration successful. You can now log in!',
        user: userInfo,
        user_info: userInfo,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    const loginDto = {
      email: body.email?.trim()?.toLowerCase(),
      password_raw: body.password_raw || body.password,
    };

    const result = await this.usersService.loginUser(loginDto);
    
    return {
      message: 'Login successful',
      accessToken: result.access_token,
      access_token: result.access_token,
      user: result.user_info,
      user_info: result.user_info,
    };
  }

  @Post('token-for-user')
  async tokenForUser(@Body() body: any) {
    return await this.usersService.generateTokenForUser(body.id || body.user_id, body.email);
  }
}
