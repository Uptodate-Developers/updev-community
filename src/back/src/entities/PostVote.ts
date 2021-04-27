import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {Post} from "./Post"
import {User} from "./User"
@Entity()
export class PostVote {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    voteStatus:string

    @ManyToOne(() => Post, post => post.votes)
    post: Post

    @ManyToOne(() => User, user => user.votes)
    user: User

}
