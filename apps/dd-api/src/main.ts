import { NestFactory } from '@nestjs/core';
import { DdApiModule } from './dd-api.module';
import { ConfigModule } from '@nestjs/config';
const cors = require('cors');
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DdApiModule);
  app.use(cors());


  ConfigModule.forRoot({ envFilePath: ".env" });


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // ? Configuracion para convertir los DTO implicitamente
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );

  await app.listen(process.env.API_PORT);
}
bootstrap();
