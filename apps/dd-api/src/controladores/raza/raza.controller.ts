/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
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


    @Post("foto")
    @UseInterceptors(FileInterceptor('image'))
    async dar_foto(@Body() Body,@UploadedFile() file){

        console.log("hola---------")
        console.log("file",file)
        console.log("id_raza",Body.id_raza)
        return await this.RazaService.dar_foto(Body.id_raza,file.path)
    }

    @Post()
    async crear_raza(@Body() data :CreateRazaDto){

        console.log("hola---------")
        return await this.RazaService.crear(data)
    }

}
