/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { StackService } from './stack.service';

@Controller("stack")
export class StackController {

    constructor(
        private StackService : StackService
    ){}


    @Get()
    async get_stacks(){
        return await this.StackService.get_stacks()
    }



}
