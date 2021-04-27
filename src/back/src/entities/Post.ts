import {Column, Entity, PrimaryGeneratedColumn,OneToMany,ManyToOne,ManyToMany, JoinTable} from "typeorm"
import {Reply} from "./Reply"
import {Photo} from "./Photo"
import {HashTag} from "./HashTag"
import {User} from "./User"
import {PostVote} from "./PostVote"

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:false})
    title:string

    @Column({nullable:false})
    body:string

    @Column()
    upvote:number

    @Column()
    downvote:number

    @Column()
    datePosted: Date

    @OneToMany(() => Reply, reply => reply.post)
    replies: Reply[]

    @OneToMany(() => Photo, photo => photo.post)
    photos:Photo[]

    @OneToMany(() => PostVote, vote => vote.post)
    votes:PostVote[]

    @ManyToMany(() => HashTag)
    @JoinTable()
    hashTags: HashTag[]

    @ManyToOne(() => User, user => user.posts)
    user: User



}