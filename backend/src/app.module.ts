import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HomestaysModule } from './homestays/homestays.module';
import { BookingsModule } from './bookings/bookings.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'homestay',
      autoLoadEntities: true,
      synchronize: false, // Use existing database schema without conflict
    }),
    AuthModule,
    UsersModule,
    HomestaysModule,
    BookingsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
