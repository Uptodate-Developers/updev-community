import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class HashTag{

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true,nullable:false})
    tag:string

    @Column()
    dateCreated: Date = new Date()

    @Column()
    dateUpdated: Date = new Date()

    @Column()
    taggedPostsCount:number
}