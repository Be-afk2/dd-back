import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ConfigModule.forRoot({envFilePath:".env"});
  await app.listen(process.env.BACK_PORT);
}
bootstrap();
