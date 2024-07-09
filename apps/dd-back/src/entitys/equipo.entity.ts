import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class Equipo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_personje : number

    @Column()
    cabeza: number


    @Column()
    torzo: number

    @Column()
    botas: number


    @Column()
    pantalones: number

    @Column()
    mano_i: number


    @Column()
    mano_d: number
    
    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}