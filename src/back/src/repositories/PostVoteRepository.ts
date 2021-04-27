
import {EntityRepository, Repository} from "typeorm"
import {PostVote} from "../entities"

@EntityRepository(PostVote)
export class PostVoteRepository extends Repository<PostVote> {
    findByID(id: string): Promise<PostVote|undefined> {
        return this.findOne(id)
    }
}