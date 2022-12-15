import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { connectToDatabase } from 'utils/connect';
import { AppModule } from './app.module';

const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

async function bootstrap() {
  // await connectToDatabase();
  const app = await NestFactory.create(AppModule);
  app.enableCors(options);
  app.useGlobalPipes(new ValidationPipe());
  const Port = parseInt(process.env.PORT) || 3001;
  await app.listen(Port);
}
bootstrap();
