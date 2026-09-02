import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomestaysService } from './homestays.service';
import { HomestaysController } from './homestays.controller';
import { Homestay } from './entities/homestay.entity';

@Module({
  // 2. Add TypeOrmModule to the imports array
  imports: [TypeOrmModule.forFeature([Homestay])],
  controllers: [HomestaysController],
  providers: [HomestaysService],
})
export class HomestaysModule {}