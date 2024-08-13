
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class Stack extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    nombre : string

    @Column({default:""})
    descripcion : string


    @Column({default:true})
    automatico:boolean

    @Column({default: "9d6bd0"})
    color:string

    @Column({default: "ffffff"})
    colorLetra:string

    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}