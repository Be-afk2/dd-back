/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller("auth")
export class AuthController {

    constructor(
        private AuthService: AuthService
    ) { }

    @Get("")
    async get_token() {

        return this.AuthService.crear_token_test()

    }

    
    @UseGuards(JwtAuthGuard)
    @Get("token")
    async get_info_token(@Request() req) {
        return req.user

    }



}
