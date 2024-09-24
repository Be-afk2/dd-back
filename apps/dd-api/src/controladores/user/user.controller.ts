/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FuncionesService } from '../../funciones.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UserController {

    constructor(
        private UserService : UserService,
    ){}


    @UseGuards(JwtAuthGuard)
    @Get()
    get_info_by_token_user(){

    }


    @Post("Login")
    async login(){


        
    }


}
