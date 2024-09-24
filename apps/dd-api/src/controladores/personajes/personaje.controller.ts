/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, UseGuards ,Request} from '@nestjs/common';
import { PersonajeService } from './personaje.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CrearPersonajeDto } from './dto/CrearPersonajeDto.dto';


@Controller("personaje")
export class PersonajeController {

    constructor(
        private PersonajeService : PersonajeService,
        
    ){}



    @Get("CrearBot")
    async crear_bot(@Query('nivel') nivel: number , @Query('raza') raza: number,@Query('max') max: string,@Query('min') min: string,@Query('nombre') nombre: string){
        return await this.PersonajeService.crear_bot(nivel,raza,parseInt(max),parseInt(min),nombre)
    }


    

    @Get("infouser")
    async dar_info (@Query('id_user') id_user: number){
        return  await this.PersonajeService.dar_info(id_user)
    }



    @Post("subirnivel")
    async subir_nivel(@Body() body){
        return  await this.PersonajeService.subir_nivel(body.id_user,body.id_stack)
    }

 

    @Get("Get_personaje")
    async get_personajes_by_id_iser(@Query('user') user: number){

        return await this.PersonajeService.get_by_id(user)
    }



    @UseGuards(JwtAuthGuard)
    @Get("stacks")
    async get_stacks_by_id(@Request() req){
        return await this.PersonajeService.get_stacks(req.user.id_personaje)
    }


    @Post("Crear")
    @UseGuards(JwtAuthGuard)
    async Crear_personaje_User(@Body() data :CrearPersonajeDto,@Request() req){

        return await this.PersonajeService.CrearPersonaje(data,req.user.id_user)

    }


}
