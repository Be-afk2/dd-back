import { RazaService } from './raza.service';
import { RazaController } from './raza.controller';
import { Module } from '@nestjs/common';
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
          ])

    ],
    controllers: [RazaController,],
    providers: [RazaService,],
})
export class RazaModule { }
 