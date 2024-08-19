/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { Repository } from 'typeorm';
import { CreateRazaDto } from './dto/RegisterRaza.dto';
import { FotoRaza } from 'apps/dd-back/src/entitys/fotoraza.entity';
import { throws } from 'assert';
import * as moment from 'moment';
import { ADDRGETNETWORKPARAMS } from 'dns';

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


    async get_stacks_proces() {

    }

    async get_lista_raza_v2(paguina: number, cantidad: number) {

        const [data, total] = await this.RazaRepository.findAndCount({
            skip: (paguina - 1) * cantidad,
            take: cantidad,
        });

        var data_proces = []
        for (let raza of data) {
            var afinidad_proces = []

            const afinidades = await this.AfinidadRepository.findBy({id_raza:raza.id})
            for(let afinidad of afinidades){
                const stack = await this.StackRepository.findOneBy({id:afinidad.stack_id})
                afinidad_proces.push({
                    id:afinidad.id,
                    stack_id : stack.id,
                    stack_nombre : stack.nombre,
                    stack : afinidad.stack
                })
            }
            const foto = await this.FotoRazaRepository.findOneBy({id_raza:raza.id})
            data_proces.push({
                id:raza.id,
                nombre : raza.nombre,
                descripcion : raza.descripcion,
                afinidades: afinidad_proces,
                creado : moment(raza.created_at).format("DD-MM-YYYY"),
                foto:foto.path
            })

        }


        return { data_proces, total }
    }

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

    async guardar_afinidad(data: CreateRazaDto, id_raz: number) {

        console.log(data)

        for (let item of data.afinidad) {

            try {

                const afinidad = await this.AfinidadRepository.save({
                    id_raza: id_raz,
                    stack: item.stack,
                    stack_id: item.stack_id
                })


            }
            catch (e) {
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
            xp_nivel: data.xp_nivel,
            xp_recompenza: data.xp_recompenza,
            // animal: data.animal

        })

        await this.guardar_afinidad(data, raza.id)
        return raza.id
    }

    async dar_foto(id_raza, ubicacion_foto) {


        const foto = await this.FotoRazaRepository.save({
            path: ubicacion_foto,
            id_raza: id_raza
        })

    }

    async get_raza(id_raza:number){

        const raza = await this.RazaRepository.findOneBy({id:id_raza})
        if(!raza){
            throw new NotFoundException("Raza no encontrada")
        }
        const stack = await this.StackRepository.find()
        var data_pro = []
        for(let item of stack){

            const afinidad = await this.AfinidadRepository.findOneBy({id_raza:id_raza,stack_id:item.id})
            data_pro.push({
                id:item.id,
                nombre:item.nombre,
                stack:afinidad ? afinidad.stack : 0
            })

        }

        return data_pro

    }


    async get_mini_lista_raza(){

        const razas = await this.RazaRepository.find({})
        var data_pro  = []
        for(let item of razas){
            data_pro.push({
                id:item.id,
                nombre:item.nombre
            })
        }
        return data_pro
    }

}
