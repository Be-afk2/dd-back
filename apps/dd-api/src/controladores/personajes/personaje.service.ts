/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { FuncionesService } from '../../funciones.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Afinidad } from 'apps/dd-back/src/entitys/afinidad.entity';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';
import { Raza } from 'apps/dd-back/src/entitys/raza.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { StackPersonaje } from 'apps/dd-back/src/entitys/stacks_personajes.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PersonajeService {
    constructor(
        private FuncionesService: FuncionesService,
        @InjectRepository(Raza)
        private RazaRepository: Repository<Raza>,
        @InjectRepository(Stack)
        private StackRepository: Repository<Stack>,
        @InjectRepository(Afinidad)
        private AfinidadRepository: Repository<Afinidad>,

        @InjectRepository(StackPersonaje)
        private StackPersonajeRepository: Repository<StackPersonaje>,

        @InjectRepository(Personaje)
        private PersonajeRepository: Repository<Personaje>,
    ){}



    async crear_bot(nivel, raza, max: number, min: number, nombre) {


        var personaje = await this.PersonajeRepository.save({
            nombre: nombre,
            nivel: nivel,
            raza: raza,
            vivo: true,
            bot: true
        })

        const stacks_ = await this.FuncionesService.crear_stacks(min, max, personaje.id)


        let stacks = {};
        for (let item of stacks_) {
            stacks[item.nombre] = item.stack;
        }

        return { personaje, stacks }

    }


    async dar_info(id_personaje) {
        const personaje = await this.PersonajeRepository.findOneBy({ id: id_personaje })



        const stacks_ = await this.StackPersonajeRepository.findBy({ id_Personaje: id_personaje })


        let stacks = {};
        for (let item of stacks_) {
            const name_stack = await this.StackRepository.findOneBy({ id: item.idStack })

            stacks[name_stack.nombre] = item.stack;
        }

        return { personaje, stacks }
    }


    async subir_nivel(id_user, id_stack) {

        const stack = await this.StackPersonajeRepository.findOneBy({ id_Personaje: id_user, idStack: id_stack })

        stack.stack = stack.stack + 1

        stack.save()
    }


    async get_by_id(user_id){


        const personajes = await this.PersonajeRepository.findBy({user_id:user_id, vivo:true})
        var data = []
        for(let item of personajes){
            data = data.concat({
                id: item.id,
                nombre : item.nombre
            })
        }
        
        return data

    }

    async get_stacks(id_personaje){
        const personaje = await this.PersonajeRepository.findOneBy({id:id_personaje})
        const stacks = await this.StackRepository.find()
        var stack_proces = []
        for(let item of stacks){
    


            const stack_personaje = await this.StackPersonajeRepository.findOneBy({
                idStack:item.id,
                id_Personaje : personaje.id})


          stack_proces = stack_proces.concat({
            id:item.id,
            nombre : item.nombre,
            val : stack_personaje ?stack_personaje.stack : 0 ,
            color : item.color,
            colorLetra : item.colorLetra,
          })
        }
        return stack_proces
      }



}
