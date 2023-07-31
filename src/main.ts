import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function startServer() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  });

  const configDoc = new DocumentBuilder()
    .setTitle('Gerenciamento de Contatos')
    .setDescription(
      'Uma api simples e fácil para controle e proteção de seus contatos',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configDoc);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  await app.listen(5000);
}

startServer();
