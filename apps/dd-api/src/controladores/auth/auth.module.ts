import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/
import { JwtModule } from '@nestjs/jwt';

import { Module } from '@nestjs/common';
import { PersonajeService } from '../personajes/personaje.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '450s' },
        }),
    ],
    controllers: [AuthController,],
    providers: [AuthService,JwtStrategy],
})
export class AuthModule { }
