import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Post} from "./Post"
import {Photo} from "./Photo"
import {User} from "./User"
import {HashTag} from "./HashTag";

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

    @ManyToMany(() => HashTag)
    @JoinTable()
    hashTags: HashTag[]

    @ManyToOne(() => User, user => user.replies)
    user: User
}