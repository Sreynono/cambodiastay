import { Controller, Post, Body, UseGuards, Request, Get, Query, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HomestaysService } from './homestays.service';
import { CreateHomestayDto } from './dto/create-homestay.dto';
import { UpdateHomestayDto } from './dto/update-homestay.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('homestays')
export class HomestaysController {
  constructor(private readonly homestaysService: HomestaysService) {}

  // 2. Protect the route with the JWT Guard
  @UseGuards(AuthGuard('jwt')) 
  @Post()
  create(@Request() req, @Body() createHomestayDto: CreateHomestayDto) {
    // 3. Extract the userId securely from the token and pass it to the service
    return this.homestaysService.create(req.user.userId, createHomestayDto);
  }

  // Fetch all homestays. Example filter: /homestays?province=Kampot
  @Get()
  findAll(@Query() query: any) {
    return this.homestaysService.findAll(query);
  }

  // Fetch a specific homestay. Example: /homestays/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homestaysService.findOne(+id); // The '+' converts the ID string to a number
  }

  // ==========================================
  // PROTECTED ROUTES (Requires Token)
  // ==========================================

  // Update a homestay. Example: PATCH /homestays/1
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateHomestayDto: UpdateHomestayDto) {
    // We pass req.user.userId to verify ownership in the service
    return this.homestaysService.update(+id, req.user.userId, updateHomestayDto);
  }

  // Delete a homestay. Example: DELETE /homestays/1
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.homestaysService.remove(+id, req.user.userId);
  }

  // Upload an image. Example: POST /homestays/2/image
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/homestays', // Where to save the file
      filename: (req, file, callback) => {
        // Create a unique filename (e.g., 163456789-myphoto.jpg)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  uploadImage(
    @Param('id') id: string, 
    @Request() req, 
    @UploadedFile() file: Express.Multer.File
  ) {
    // Pass the homestay ID, the host's ID, and the newly generated filename to the service
    return this.homestaysService.uploadImage(+id, req.user.userId, file.filename);
  }
}