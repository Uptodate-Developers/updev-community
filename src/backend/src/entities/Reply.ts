import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Post} from "./Post"
import {Photo} from "./Photo";

@Entity()
export class Reply{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    body:string

    @Column()
    upvote:number

    @Column()
    downvote:number

    @Column()
    datePosted: Date

    @ManyToOne(type => Post, post => post.replys)
    post: Post

    @OneToMany(type => Photo,photo => photo.post)
    photos:Photo[]

    @ManyToOne(type => Reply, reply => reply.replies)
    reply: Reply

    @OneToMany(type => Reply, reply => reply.reply)
    replies:Reply[]
}