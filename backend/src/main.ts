import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', { exclude: ['uploads'] });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // This is crucial for type conversion
  }));
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('Local: http://localhost:3000/api');
  });
}
bootstrap();
