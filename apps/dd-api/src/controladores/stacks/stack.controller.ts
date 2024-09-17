/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post } from '@nestjs/common';
import { StackService } from './stack.service';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';

@Controller("stack")
export class StackController {

    constructor(
        private StackService : StackService
    ){}


    @Get()
    async get_stacks(){
        return await this.StackService.get_stacks()
    }


    @Post("base")
    async cargar_stack_base(){
        return Stack.cargar_stack_base()
    }


}
