
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Timestamp, Table, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class Stack extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    nombre: string

    @Column({ default: "" })
    descripcion: string


    @Column({ default: true })
    automatico: boolean

    @Column({ default: "#ffffff00" })
    color: string

    @Column({ default: "ffffff" })
    colorLetra: string


    @Column({ default: 0 })
    base : number;


    @DeleteDateColumn()
    deleted_at: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;


    static async cargar_stack_base() {
        const data = [
            {
                id: 1,
                nombre: "Vida",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Vitalidad de la criatura",
                automatico: true,
                base: 5

            },
            {
                id: 2,
                nombre: "Fuerza",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Fuerza de la criatura",
                automatico: true,
                base: 1


            },
            {
                id: 3,
                nombre: "Destreza",
                color: "ffffff00",
                colorLetra: "000000",
                automatico: true,
                descripcion: "Destreza de la criatura",
                base: 1

            },
            {
                id: 4,
                nombre: "Inteligencia",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Inteligencia de la criatura",
                automatico: true,
                base: 1


            },
            {
                id: 5,
                nombre: "Carisma",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Carisma de la criatura",
                automatico: true,
                base: 1


            },
            {
                id: 6,
                nombre: "Resistencia",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Resistencia de la criatura",
                automatico: true,
                base: 1

            }, {

                id: 7,
                nombre: "Magia de Fuego",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Magia de fuego",
                automatico: false,
                base: 0

            },
            {

                id: 8,
                nombre: "Magia de Tierra",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Magia de tierra",
                automatico: false,
                base: 0

            },
            {

                id: 9,
                nombre: "Magia de Agua",
                color: "ffffff00",
                colorLetra: "000000",
                descripcion: "Magia de agua",
                automatico: false,
                base: 0

            },

        ]


        for(let item of data){
            const test = await this.findOneBy({id:item.id})
            if(test){continue}
            await this.save({
                id: item.id,
                nombre : item.nombre,
                color : item.color,
                colorLetra : item.colorLetra,
                descripcion : item.descripcion,
                automatico : item.automatico,
                base : item.base
            })    
        }

        return "ok"
        
    }

}