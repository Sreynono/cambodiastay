import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homestay } from './entities/homestay.entity';
import { CreateHomestayDto } from './dto/create-homestay.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateHomestayDto } from './dto/update-homestay.dto';

@Injectable()
export class HomestaysService {
  constructor(
    @InjectRepository(Homestay)
    private homestaysRepository: Repository<Homestay>,
  ) {}

  async create(host_id: number, createHomestayDto: CreateHomestayDto) {
    // 1. Combine the secure host_id with the farm details
    const newHomestay = this.homestaysRepository.create({
      ...createHomestayDto,
      host_id: host_id, 
    });

    // 2. Save it to the database (Status defaults to 'Pending' automatically)
    return await this.homestaysRepository.save(newHomestay);
  }

  // ==========================================
  // VIEW & SEARCH HOMESTAYS
  // ==========================================

  // 1. Fetch all homestays (with optional filtering)
  async findAll(query?: any) {
    return await this.homestaysRepository.find({
      where: query,
      // <-- FIX: Changed from array to object syntax
      relations: { 
        host: true 
      }, 
      select: {
        homestay_id: true,
        title: true,
        description: true,
        province: true,
        price_per_night: true,
        status: true,
        created_at: true,
        host: {
          user_id: true,
          full_name: true,
        }
      }
    });
  }

  // 2. Fetch a single homestay by its ID
  async findOne(homestay_id: number) {
    return await this.homestaysRepository.findOne({
      where: { homestay_id },
      // <-- FIX: Changed from array to object syntax
      relations: { 
        host: true 
      },
      select: {
        homestay_id: true,
        title: true,
        description: true,
        province: true,
        price_per_night: true,
        status: true,
        created_at: true,
        host: {
          user_id: true,
          full_name: true,
        }
      }
    });
  }

  // ==========================================
  // UPDATE & DELETE HOMESTAYS (Protected)
  // ==========================================

  // 3. Update a homestay
  async update(homestay_id: number, host_id: number, updateHomestayDto: UpdateHomestayDto) {
    // First, find the homestay
    const homestay = await this.findOne(homestay_id);
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }
    
    // Security Check: Does the logged-in user own this homestay?
    if (homestay.host.user_id !== host_id) {
      throw new UnauthorizedException('You can only edit your own farm stays');
    }

    // If it passes, update and return the new data
    await this.homestaysRepository.update(homestay_id, updateHomestayDto);
    return this.findOne(homestay_id);
  }

  // 4. Delete a homestay
  async remove(homestay_id: number, host_id: number) {
    const homestay = await this.findOne(homestay_id);
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }

    if (homestay.host.user_id !== host_id) {
      throw new UnauthorizedException('You can only delete your own farm stays');
    }

    await this.homestaysRepository.delete(homestay_id);
    return { message: `Homestay #${homestay_id} successfully deleted.` };
  }

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================
  
  async uploadImage(homestay_id: number, host_id: number, filename: string) {
    const homestay = await this.findOne(homestay_id);
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }
    
    // Security check
    if (homestay.host.user_id !== host_id) {
      throw new UnauthorizedException('You can only upload images for your own homestays');
    }

    // Save the new image path to the database
    homestay.image_url = `/uploads/homestays/${filename}`;
    return await this.homestaysRepository.save(homestay);
  }

}