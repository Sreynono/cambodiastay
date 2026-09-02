import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

// Make sure the uploads folder exists before trying to save to it!
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

@Controller('homestays')
export class HomestaysController {
  
  @Post('apply')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads', // Saves the file in the 'uploads' folder
      filename: (req, file, callback) => {
        // Generates a unique, random name for the image so they don't overwrite each other
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  createHomestay(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    console.log('Received Text Data from Vue:', body);
    
    if (file) {
      console.log('Successfully saved file as:', file.filename);
    }

    // This is the URL Vue will use to display the image later!
    const photoUrl = file ? `http://localhost:3000/uploads/${file.filename}` : null;

    // TODO: Later, you will write the MySQL code here to save 'body' and 'photoUrl' to the database.

    return { 
      message: 'Application and photo received successfully!',
      photoUrl: photoUrl 
    };
  }
}