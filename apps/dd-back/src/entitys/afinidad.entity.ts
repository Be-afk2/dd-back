import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class Afinidad extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({nullable:false})
    id_raza: number


    // @Column({nullable:true})
    // descripcion : string

    @Column({nullable:true})
    stack: number

    @Column({nullable:true})
    stack_id: number

    // @Column({nullable:true})
    // objeto:number    

    // @Column({nullable:true})
    // objeto_id:number    

    
    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}