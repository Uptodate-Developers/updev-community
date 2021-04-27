import {EntityRepository, Repository} from "typeorm"
import {ReplyVote} from "../entities"

@EntityRepository(ReplyVote)
export class ReplyVoteRepository extends Repository<ReplyVote> {
    findByID(id: string): Promise<ReplyVote|undefined> {
        return this.findOne(id)
    }
}