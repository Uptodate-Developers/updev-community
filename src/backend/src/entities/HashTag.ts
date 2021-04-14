import {Column, Entity, PrimaryGeneratedColumn,ManyToMany, JoinTable} from "typeorm"

@Entity()
export class HashTag{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    tag:string

    @Column()
    dateCreated: Date
}