import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class HashTag{

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    tag:string

    @Column()
    dateCreated: Date = new Date()

    @Column()
    taggedPostsCount:number
}