
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class Personaje extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre:string;

    @Column({default:0})
    nivel : number;

    @Column()
    raza : number;

    @Column({default:false})
    vivo : boolean;


    @Column()
    bot:boolean

    @Column({default:0})
    xp : number

    @Column({nullable:true})
    user_id : number


    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}