import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Personaje } from 'apps/dd-back/src/entitys/personaje.entity';
import { Stack } from 'apps/dd-back/src/entitys/stacks.entity';
import { User } from 'apps/dd-back/src/entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DdWebService {

  constructor(
    @InjectRepository(User)
    private UseraRepository: Repository<User>,

    @InjectRepository(Personaje)
    private PersonajeRepository: Repository<Personaje>,

    @InjectRepository(Stack)
    private StackRepository: Repository<Stack>,

    private jwtService : JwtService
  ){}



  async get_user() {

    return await this.UseraRepository.find()


  }

  async login(data){

    const user = await this.UseraRepository.findOneBy({id:data.id_user})


    const payload = { id_user: data.id_user, id_personaje:data.id_personaje }
    const token = this.jwtService.sign(payload)

    return { id: user.id,nombre : user.nombre, descripcion : user.descripcion , id_personaje : data.id_personaje,token}

  }



}
