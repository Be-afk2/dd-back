
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany, JoinColumn, OneToOne} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Inventario } from './inventario.entity';


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    nombre : string

    @Column({default:"*inserte descripcion*"})
    descripcion : string

    @OneToOne(() => Inventario)
    @JoinColumn()
    Inventario: Inventario

    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}