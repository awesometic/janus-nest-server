import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // Ensure that all data sent to the server is valid
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  await app.listen(3000);
}
bootstrap();
