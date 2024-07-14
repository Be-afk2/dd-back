import { RazaService } from './raza.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RazaController } from './raza.controller';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';
const multer = require('multer');
import { MulterModule } from '@nestjs/platform-express';

import { extname } from 'path';
import { FotoRaza } from 'apps/dd-back/src/entitys/fotoraza.entity';


@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TypeOrmModule.forFeature([
            Raza,
            Stack,
            Afinidad,
            StackPersonaje,
            FotoRaza
        ]),
        MulterModule.register({
            storage: multer.diskStorage({
              destination: (req, file, cb) => {
                cb(null, 'public/images/raza-images/');
              },
              filename: (req, file, cb) => {
                const fileName = file.originalname
                  .replace(/[^\w\s]/gi, '')
                  .replace(/\s+/g, '');
                const extension = extname(file.originalname);
                cb(null, `${fileName}-${Date.now()}${extension}`);
              },
            }),
          }),

    ],
    controllers: [RazaController],
    providers: [RazaService,],
})
export class RazaModule { }
