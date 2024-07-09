/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }


    async crear_token_test() {


        const payload = { id: 0, invitado: true }
        const token = this.jwtService.sign(payload)

        return token
    }




}
