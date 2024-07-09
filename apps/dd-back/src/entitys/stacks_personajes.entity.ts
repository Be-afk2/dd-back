
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class StackPersonaje extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    idStack : number
    @Column({default:0})
    stack:number


    @Column()
    id_Personaje:number

    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}