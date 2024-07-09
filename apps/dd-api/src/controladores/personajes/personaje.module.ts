import { PersonajeService } from './personaje.service';
import { PersonajeController } from './personaje.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/dd-back/src/entitys/user.entity';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';
import { FuncionesService } from '../../funciones.service';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Personaje,
            Raza,
            Afinidad,
            Stack,
            StackPersonaje,
            
        ]),

    ],
    controllers: [PersonajeController,],
    providers: [PersonajeService,FuncionesService],
})
export class PersonajeModule { }
