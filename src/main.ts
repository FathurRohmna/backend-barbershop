import {
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

export async function createApp(options?: NestApplicationOptions) {
  const app = await NestFactory.create(AppModule, options);
  await configureApp(app);
  return app;
}

export async function configureApp(app: INestApplication) {
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

async function bootstrap() {
  const app = await createApp();
  app.setGlobalPrefix('v1/api');
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,DELETE,UPDATE',
    allowedHeaders: 'Origin, X-Requested-With,Content-Type,Accept',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Barber shop API (HiApp Assignment)')
    .addBearerAuth()
    .setDescription(
      'This API has beenn created to help developpers to prototypate theirs apps easily',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs/v1', app, document);

  await app.listen(4000);
}
bootstrap();
