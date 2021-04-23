import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {Post} from "./Post"
import {Reply} from "./Reply"

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    url:string

    @Column()
    description:string

    @ManyToOne(() => Post, post => post.photos)
    post:Post

    @ManyToOne(() => Reply, reply => reply.photos)
    reply:Reply

    @Column()
    dateCreated: Date= new Date()

}