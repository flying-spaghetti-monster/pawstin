import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: string | undefined = process.env.PORT;

  //Only for REST API
  app.setGlobalPrefix('api', { exclude: ['/qraph', '/uploads'] });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // This is crucial for type conversion
  }));
  app.enableCors();

  await app.listen(PORT || 3000, () => {
    console.log(`REST API: http://localhost:${PORT}/api`);
    console.log(`GraphQL: http://localhost:${PORT}/graphql`);
  });
}
bootstrap();
