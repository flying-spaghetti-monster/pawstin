import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  //Only for REST API
  app.setGlobalPrefix('api', { exclude: ['/qraph', '/uploads'] });
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true, // This is crucial for type conversion
  // }));

  app.enableCors({
    origin: configService.getOrThrow<string>('CORS_URL'), // Allow all origins by default
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(serverConfig.port, () => {
    console.log(`REST API: http://localhost:${serverConfig.port}/api`);
    console.log(`GraphQL: http://localhost:${serverConfig.port}/graphql`);
  });
}
bootstrap();
