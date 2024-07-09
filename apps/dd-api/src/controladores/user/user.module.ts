import { UserService } from './user.service';
import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';

import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { FuncionesService } from '../../funciones.service';
import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TypeOrmModule.forFeature([
            Personaje,
            Afinidad,
            Stack,
            Raza,
            StackPersonaje
        ])
    ],
    controllers: [UserController,],
    providers: [UserService,FuncionesService],
})
export class UserModule { }
