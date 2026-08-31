import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
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
      password: '1234', // MAKE SURE TO PUT YOUR PASSWORD BACK HERE!
      database: 'homestay',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    HomestaysModule,
    BookingsModule,
    ReviewsModule,
  ],
  // We removed the missing AppController and AppService from down here:
  controllers: [],
  providers: [],
})
export class AppModule {}
