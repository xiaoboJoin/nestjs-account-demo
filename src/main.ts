import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth({ type: 'http', name: 'authorization', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();
  console.log(options)
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
