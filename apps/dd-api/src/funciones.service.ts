/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FuncionesService {


    constructor(
        @InjectRepository(Stack)
        private StackRepository: Repository<Stack>,

        @InjectRepository(StackPersonaje)
        private StackPersonajeRepository: Repository<StackPersonaje>,
    ) { }

     numero_azar(max:number, min:number) {
        var randomNumber = Math.floor(Math.random()*(max-min+1)+min);
        // console.log("numero_azar max/min",`${max}/${min}`);
        // console.log("resultado" , randomNumber);
        // console.log("max",max , typeof max)
        // console.log("min",min, typeof min)
        // console.log("--------numero_azar--------")

        return randomNumber;
    }

    async crear_stacks(min, max,id_personaje) {
    

        const stack = await this.StackRepository.find()

        var stack_user = []

        for(let item of stack){

            const new_stack = await this.StackPersonajeRepository.save({
                idStack : item.id,
                stack : item.automatico ? this.numero_azar(max,min) : 0,
                id_Personaje : id_personaje

            })

            stack_user = stack_user.concat({
                nombre: item.nombre,
                stack: new_stack.stack,
                stackId: item.id
            })



        }
        return stack_user
    }



}
