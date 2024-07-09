/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StackService {

    constructor(
        @InjectRepository(Stack)
        private StackRepository: Repository<Stack>,
    ){}




    async get_stacks(){
        const stack = await this.StackRepository.find()
        var stack_proces = []
        for(let item of stack){
            stack_proces = stack_proces.concat({
                id:item.id,
                stack : item.nombre,
                descripcion : item.descripcion
            })
        }
        return stack_proces
    }



}
