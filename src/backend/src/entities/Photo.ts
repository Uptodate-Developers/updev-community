import {Column, Entity, PrimaryGeneratedColumn,ManyToOne} from "typeorm"
import {Post} from "./Post";
import {Reply} from "./Reply";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    url:string

    @ManyToOne(type => Post,post => post.photos)
    post:Post

    @ManyToOne(type=> Reply, reply => reply.photos)
    reply:Reply

    @Column()
    dateCreated: Date

}