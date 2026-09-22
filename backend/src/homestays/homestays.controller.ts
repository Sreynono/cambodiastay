import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { HomestaysService } from './homestays.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

@Controller('homestays')
export class HomestaysController {
  constructor(private readonly homestaysService: HomestaysService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.homestaysService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.homestaysService.findOne(+id);
  }

  @Get(':id/availability')
  async getAvailability(@Param('id') id: string) {
    return this.homestaysService.getHomestayAvailability(+id);
  }

  @Post('apply')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async apply(
    @Body() body: any,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const coverFile =
      files?.find((f) => f.fieldname === 'coverPhoto' || f.fieldname === 'photo') ||
      files?.find((f) => f.fieldname !== 'video' && f.fieldname !== 'hostAvatar' && f.fieldname !== 'hostPhoto');
    const photoUrl = coverFile
      ? `http://localhost:3000/uploads/${coverFile.filename}`
      : body.photoUrl || body.coverPhotoUrl || null;

    // Host avatar / photo
    const hostAvatarFile = files?.find(
      (f) => f.fieldname === 'hostAvatar' || f.fieldname === 'hostPhoto',
    );
    const hostAvatarUrl = hostAvatarFile
      ? `http://localhost:3000/uploads/${hostAvatarFile.filename}`
      : body.hostAvatarUrl || body.host_avatar_url || null;

    // Collect all other gallery photos uploaded
    const galleryFiles =
      files?.filter(
        (f) =>
          f !== coverFile &&
          f !== hostAvatarFile &&
          f.fieldname !== 'video' &&
          f.fieldname !== 'hostAvatar' &&
          f.fieldname !== 'hostPhoto',
      ) || [];
    const uploadedGalleryUrls = galleryFiles.map(
      (f) => `http://localhost:3000/uploads/${f.filename}`,
    );

    let bodyGallery: string[] = [];
    if (body.galleryPhotos) {
      try {
        bodyGallery =
          typeof body.galleryPhotos === 'string'
            ? JSON.parse(body.galleryPhotos)
            : body.galleryPhotos;
      } catch {
        bodyGallery = [body.galleryPhotos];
      }
    }
    const allGalleryUrls = [...uploadedGalleryUrls, ...bodyGallery];

    // Collect video tour if uploaded
    const videoFile = files?.find((f) => f.fieldname === 'video');
    const videoUrl = videoFile
      ? `http://localhost:3000/uploads/${videoFile.filename}`
      : body.videoUrl || body.video_url || null;

    return this.homestaysService.apply(
      body,
      photoUrl,
      allGalleryUrls,
      videoUrl,
      hostAvatarUrl,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.HOST, Role.ADMIN)
  async create(@Req() req: any, @Body() body: any) {
    const hostId = req.user?.id || req.user?.userId;
    return this.homestaysService.createHomestay(hostId, body);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.homestaysService.updateStatus(+id, status);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.HOST, Role.ADMIN)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: any,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const userRole = String(req.user?.role || '').toLowerCase();
    const isAdmin = userRole === 'admin';
    const hostId = isAdmin ? undefined : (req.user?.id || req.user?.userId);
    return this.homestaysService.update(+id, hostId, body, files);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.HOST, Role.ADMIN)
  async remove(@Param('id') id: string, @Req() req: any) {
    const userRole = String(req.user?.role || '').toLowerCase();
    const isAdmin = userRole === 'admin';
    const hostId = isAdmin ? undefined : (req.user?.id || req.user?.userId);
    return this.homestaysService.remove(+id, hostId);
  }
}
