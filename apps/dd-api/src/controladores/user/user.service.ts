/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { Repository } from 'typeorm';
import { FuncionesService } from '../../funciones.service';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';

import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';

@Injectable()
export class UserService {
    constructor(

    ) { }








}
