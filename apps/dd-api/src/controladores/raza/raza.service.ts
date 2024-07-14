/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { Repository } from 'typeorm';
import { CreateRazaDto } from './dto/RegisterRaza.dto';
import { FotoRaza } from 'apps/dd-back/src/entitys/fotoraza.entity';
import { throws } from 'assert';

@Injectable()
export class RazaService {

    constructor(
        @InjectRepository(Raza)
        private RazaRepository: Repository<Raza>,

        @InjectRepository(Stack)
        private StackRepository: Repository<Stack>,

        @InjectRepository(FotoRaza)
        private FotoRazaRepository: Repository<FotoRaza>,

        @InjectRepository(Afinidad)
        private AfinidadRepository: Repository<Afinidad>,
    ) { }


    async get_lista_razas() {

        const razas = await this.RazaRepository.find()
        var data_proces = []

        for (let item of razas) {

            const Afinidades = await this.AfinidadRepository.findBy({ id_raza: item.id })

            var afinidades_proces = []

            for (let afinidad of Afinidades) {

                const stack = await this.StackRepository.findOneBy({ id: afinidad.stack_id })

                afinidades_proces.push({
                    id: afinidad.id,
                    // descripcion: afinidad.descripcion,
                    stack: stack.nombre,
                    stackId: stack.id,
                    adicion: afinidad.stack
                })
            }

            data_proces = data_proces.concat({
                nombre: item.nombre,
                descripcion: item.descripcion,
                // animal: item.animal,
                afinidades: afinidades_proces
            })
        }
        return data_proces
    }

    async guardar_afinidad(data:CreateRazaDto,id_raz:number){

        console.log(data)

        for(let item of data.afinidad){

            try{
                
                const afinidad = await this.AfinidadRepository.save({
                    id_raza:id_raz,
                    stack : item.stack,
                    stack_id : item.stack_id
                })


            }
            catch(e){
                console.log("-----error_guardar_afinidad------------")
                console.log(e)
                console.log("-----------------")
            }
        }


    }

    async crear(data: CreateRazaDto) {



        const raza = await this.RazaRepository.save({
            nombre: data.nombre,
            descripcion: data.descripcion,
            // animal: data.animal

        })

        await this.guardar_afinidad(data,raza.id)
        return raza.id
    }

    async dar_foto(id_raza ,ubicacion_foto){


        const foto = await this.FotoRazaRepository.save({
            path:ubicacion_foto,
            id_raza:id_raza
        })
        
    }

}
