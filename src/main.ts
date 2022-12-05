import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { connectToDatabase } from 'utils/connect';
import { AppModule } from './app.module';

async function bootstrap() {
  // await connectToDatabase();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const Port = parseInt(process.env.PORT) || 3001;
  await app.listen(Port);
}
bootstrap();
