import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  // Tell Nest we are using Express under the hood
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Allow Vue / client to connect
  app.enableCors({
    origin: true,
    credentials: true,
  }); 
  
  // Ensure uploads directory exists and is publicly accessible
  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  app.useStaticAssets(uploadDir, {
    prefix: '/uploads/',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend server running on port ${port}`);
}
bootstrap();