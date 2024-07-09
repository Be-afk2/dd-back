import { NestFactory } from '@nestjs/core';
import { DdWebModule } from './dd-web.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
import * as session from 'express-session';
const cors = require('cors');
import { ConfigModule } from '@nestjs/config';


async function bootstrap() {
  ConfigModule.forRoot({ envFilePath: ".env" });

  const app = await NestFactory.create<NestExpressApplication>(DdWebModule);

  app.use(cors());

  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: true,
      saveUninitialized: false,
    }),
  );

  app.use(expressLayouts);
  app.use(passport.initialize());
  app.use(passport.session());
  app.useStaticAssets(join(__dirname, '../../../', 'public'));
  app.setBaseViewsDir(join(__dirname, '../../../', 'views'));
  app.setViewEngine('ejs');


  await app.listen(process.env.WEB_PORT);
}
bootstrap();
