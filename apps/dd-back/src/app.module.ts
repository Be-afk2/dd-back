import { AuthModule } from './../../dd-api/src/controladores/auth/auth.module';
import { PersonajeModule } from './../../dd-api/src/controladores/personajes/personaje.module';
import { FuncionesService } from './../../dd-api/src/funciones.service';
import { StackModule } from './../../dd-api/src/controladores/stacks/stack.module';
import { RazaModule } from './../../dd-api/src/controladores/raza/raza.module';
import { UserModule } from './../../dd-api/src/controladores/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afinidad } from './entitys/afinidad.entity';
import { Raza } from './entitys/raza.entity';
import { Stack } from './entitys/stacks.entity';
import { StackPersonaje } from './entitys/stacks_personajes.entity';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';

import { Objeto } from './entitys/objetos.entity';
import { User } from './entitys/user.entity';
import { TipoObjeto } from './entitys/tipo_objeto.entity';
import { Equipo } from './entitys/equipo.entity';
import { Inventario } from './entitys/inventario.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [
        Afinidad,
        Raza,
        Stack,
        StackPersonaje,
        Personaje,
        Objeto,
        User,
        TipoObjeto,
        Equipo,
        Inventario
      ],
    }),


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
