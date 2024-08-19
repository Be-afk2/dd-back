import { PersonajeService } from './personaje.service';
import { PersonajeController } from './personaje.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { User } from 'apps/dd-back/src/entitys/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TypeOrmModule.forFeature([
            User,
            Personaje,
            Stack,
            Afinidad
          ]),
      
       
          JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '450s' },
          }),

    ],
    controllers: [PersonajeController,],
    providers: [PersonajeService,],
})
export class PersonajeModule { }
