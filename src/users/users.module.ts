import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // 1. Import the JWT library
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // 2. Configure the JWT generator
    JwtModule.register({
      secret: 'AgriTouristSuperSecretKey2026', // In production, this gets hidden in a .env file!
      signOptions: { expiresIn: '1d' }, // This logs the user out automatically after 1 day
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}