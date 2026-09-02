import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // The Bouncer
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // 1. Protected Route: Create a Booking
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(req.user.userId, createBookingDto);
  }

  // 2. Protected Route: Update Booking Status
  @UseGuards(AuthGuard('jwt')) // <-- This was the missing piece!
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string, 
    @Request() req, 
    @Body() updateBookingStatusDto: UpdateBookingStatusDto
  ) {
    return this.bookingsService.updateStatus(+id, req.user.userId, updateBookingStatusDto);
  }

  // ==========================================
  // Auto-Generated Placeholder Routes below
  // ==========================================
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: any) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}