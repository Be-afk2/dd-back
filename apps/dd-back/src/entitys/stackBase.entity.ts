
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Timestamp, Table, OneToMany} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';


@Entity()
export class StackBase extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    raza:number;

    @Column()
    stackId : number

    @Column()
    stack : number


    @DeleteDateColumn()
    deleted_at:Date;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}