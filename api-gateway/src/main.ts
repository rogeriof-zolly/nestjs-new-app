import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const options = new DocumentBuilder()
  .setTitle('App example')
  .setDescription('The app API description')
  .setVersion('1.0')
  .addTag('app')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(8080);
}
bootstrap();
