import { Controller, Post, Body, UseGuards, Request, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Import Bouncer
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard('jwt')) // Protect route!
  @Post()
  create(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    // Pass the guest's secure user ID to the service
    return this.reviewsService.create(req.user.userId, createReviewDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-reviews')
  findMyReviews(@Request() req) {
    return this.reviewsService.findByGuest(req.user.userId || req.user.id);
  }

  @Get('homestay/:homestayId')
  findByHomestay(@Param('homestayId') homestayId: string) {
    return this.reviewsService.findByHomestay(+homestayId);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
