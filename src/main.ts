import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // This tells the server to simply run on port 3000
  await app.listen(3000);
}
bootstrap();
