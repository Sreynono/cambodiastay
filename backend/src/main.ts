import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // Tell Nest we are using Express under the hood
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Allow Vue to connect
  app.enableCors(); 
  
  // Tell Nest to make the 'uploads' folder publicly viewable on the web!
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
}
bootstrap();