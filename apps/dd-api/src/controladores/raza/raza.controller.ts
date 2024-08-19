/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RazaService } from './raza.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRazaDto } from './dto/RegisterRaza.dto';
import { ADDRGETNETWORKPARAMS } from 'dns';

@Controller("raza")
export class RazaController { 

    constructor(
        private RazaService : RazaService
    ){}


    @Get("v2")
    async get_lista_razas_v2(@Query('paguina') paguina: number , @Query('cantidad') cantidad: number){
        return await this.RazaService.get_lista_raza_v2(paguina,cantidad)
    }

    @Get("")
    async get_lista_razas(@Query('paguina') paguina: number , @Query('cantidad') cantidad: number){
        return await this.RazaService.get_lista_razas()
    }
    @Get("mini")
    async get_mini_lista_raza(){
        return await this.RazaService.get_mini_lista_raza()
    }


    @Post("foto")
    @UseInterceptors(FileInterceptor('image'))
    async dar_foto(@Body() Body,@UploadedFile() file){

        console.log("hola---------")
        console.log("file",file)
        console.log("id_raza",Body.id_raza)
        let modifiedPath = file.path.replace('public\\', '');
        console.log("modifiedPath",modifiedPath)
        return await this.RazaService.dar_foto(Body.id_raza,modifiedPath)
    }

    @Post()
    async crear_raza(@Body() data :CreateRazaDto){

        console.log("hola---------")
        return await this.RazaService.crear(data)
    }


    @Get(":id")
    async get_raza_by_id(
        @Param('id') id: number,
    ){


        return await this.RazaService.get_raza(id)
    }

}
