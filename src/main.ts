import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { connectToDatabase } from 'utils/connect';
import { AppModule } from './app.module';

const cors = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5030',
    'http://localhost',
    '*',
  ],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
};

async function bootstrap() {
  // await connectToDatabase();
  const app = await NestFactory.create(AppModule);
  app.enableCors(cors);
  app.useGlobalPipes(new ValidationPipe());
  const Port = parseInt(process.env.PORT) || 3001;
  await app.listen(Port);
}
bootstrap();
