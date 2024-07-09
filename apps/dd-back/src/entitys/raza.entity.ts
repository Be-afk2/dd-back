
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class Raza extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre:string;

    @Column({nullable:true})
    descripcion : string


    // @Column({})
    // animal:boolean



    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}