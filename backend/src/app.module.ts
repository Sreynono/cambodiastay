import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HomestaysModule } from './homestays/homestays.module';
import { BookingsModule } from './bookings/bookings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      process.env.MYSQL_URL || process.env.DATABASE_URL
        ? {
            type: 'mysql',
            url: process.env.MYSQL_URL || process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: false,
            charset: 'utf8mb4',
          }
        : {
            type: 'mysql',
            host: process.env.MYSQLHOST || process.env.DB_HOST || '127.0.0.1',
            port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
            username: process.env.MYSQLUSER || process.env.DB_USER || 'root',
            password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '1234',
            database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'homestay',
            autoLoadEntities: true,
            synchronize: false,
            charset: 'utf8mb4',
          },
    ),
    AuthModule,
    UsersModule,
    HomestaysModule,
    BookingsModule,
    ReviewsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
