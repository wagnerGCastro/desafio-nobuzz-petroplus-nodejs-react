import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

const APP_PORT = process.env.APP_PORT || 3071;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(APP_PORT, () => {
    console.log(`🚀 Server started at http://localhost:${APP_PORT}`);
    console.log(`🚨️ Environment: ${process.env.NODE_ENV}`);
  });
}

bootstrap();
