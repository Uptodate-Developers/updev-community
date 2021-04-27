import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {User} from "./User"
import {Reply} from "./Reply"

@Entity()
export class ReplyVote {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    voteStatus:string

    @ManyToOne(() => Reply, reply => reply.votes)
    reply: Reply

    @ManyToOne(() => User, user => user.votes)
    user: User

}
