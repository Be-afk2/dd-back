import { Module } from '@nestjs/common';
import { DdApiController } from './dd-api.controller';
import { DdApiService } from './dd-api.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';
import { UserModule } from './controladores/user/user.module';
import { RazaModule } from './controladores/raza/raza.module';
import { StackModule } from './controladores/stacks/stack.module';
import { Objeto } from 'apps/dd-back/src/entitys/objetos.entity';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';
import { PersonajeModule } from './controladores/personajes/personaje.module';
import { AuthModule } from './controladores/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { FotoRaza } from 'apps/dd-back/src/entitys/fotoraza.entity';

@Module({
  imports: [

    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [
        Afinidad,
        Raza,
        Stack,
        StackPersonaje,
        Personaje,
        Objeto,
        FotoRaza
      ],


    }),
    AuthModule,
    UserModule,
    RazaModule,
    StackModule,
    PersonajeModule,


  ],
  controllers: [DdApiController],
  providers: [DdApiService],
})
export class DdApiModule { }
