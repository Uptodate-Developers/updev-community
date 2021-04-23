import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Post} from "./Post"
import {Photo} from "./Photo"
import {User} from "./User"

@Entity()
export class Reply{

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    body:string

    @Column()
    upvote:number

    @Column()
    downvote:number

    @Column()
    datePosted: Date = new Date()

    @ManyToOne(() => Post, post => post.replies)
    post: Post

    @OneToMany(() => Photo, photo => photo.post)
    photos:Photo[]

    @ManyToOne(() => Reply, reply => reply.replies)
    reply: Reply

    @OneToMany(() => Reply, reply => reply.reply)
    replies:Reply[]

    @ManyToOne(() => User, user => user.replies)
    user: User
}