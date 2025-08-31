import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './configs/server.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  //Only for REST API
  app.setGlobalPrefix('api', { exclude: ['/qraph', '/uploads'] });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // This is crucial for type conversion
  }));

  app.enableCors({
    origin: configService.getOrThrow<string>('CORS_URL'), // Allow all origins by default
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Pawstin store')
    .setDescription('The Pawstin store API description')
    .setVersion('1.0')
    .build();
  // Create Swagger document
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, documentFactory);

  // Swagger document for GraphQL
  const gqlDocument = SwaggerModule.createDocument(app, {
    ...config,
    info: {
      ...config.info,
      title: 'Pawstin GraphQL API',
      description: 'The Pawstin GraphQL API description',
    },
  });
  SwaggerModule.setup('graphql-doc', app, gqlDocument);

  app.use('/stripe/webhook',
    bodyParser.raw({ type: 'application/json' })
  );

  await app.listen(serverConfig.port, () => {
    console.log(`REST API: http://localhost:${serverConfig.port}/api`);
    console.log(`GraphQL: http://localhost:${serverConfig.port}/graphql`);
  });
}
bootstrap();
