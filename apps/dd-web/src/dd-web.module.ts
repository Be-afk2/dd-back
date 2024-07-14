import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { DdWebController } from './dd-web.controller';
import { DdWebService } from './dd-web.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Objeto } from 'apps/dd-back/src/entitys/objetos.entity';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';

import { LoggerMiddleware } from './logger/logger.middleware';
import { User } from 'apps/dd-back/src/entitys/user.entity';
import { RazaModule } from './razas/raza.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'apps/dd-api/src/controladores/auth/jwt.strategy';
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
        User,
        Personaje,
        Stack,
        Afinidad,
        FotoRaza
      ],
    }),
    TypeOrmModule.forFeature([
      User,
      Personaje,
      Stack,
      Afinidad
    ]),

 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '450s' },
    }),


    RazaModule,
  ],
  controllers: [DdWebController],
  providers: [DdWebService,JwtStrategy],
})
export class DdWebModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('loginView', 'login',)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
