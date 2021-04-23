import {Column, Entity, PrimaryGeneratedColumn,OneToMany,ManyToOne} from "typeorm"
import {Reply} from "./Reply"
import {Photo} from "./Photo"
import {HashTag} from "./HashTag"
import {User} from "./User"

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

    replies: Reply[]

    @OneToMany(() => Photo, photo => photo.post)
    photos:Photo[]

    hashTags: HashTag[]

    @ManyToOne(() => User, user => user.posts)
    user: User

}