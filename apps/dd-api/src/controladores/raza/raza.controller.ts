/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RazaService } from './raza.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRazaDto } from './dto/RegisterRaza.dto';

@Controller("raza")
export class RazaController { 

    constructor(
        private RazaService : RazaService
    ){}


    @Get("")
    async get_lista_razas(){
        return await this.RazaService.get_lista_razas()
    }


    @Post("")
    @UseInterceptors(FileInterceptor('image'))
    async crear_raza(@Body() data :CreateRazaDto ,@UploadedFiles() file){

        console.log("hola---------")
        return await this.RazaService.crear(data)
    }


}
