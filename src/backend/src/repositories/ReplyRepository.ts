import {EntityRepository, Repository} from "typeorm"
import {Reply} from "../entities"

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
    findByID(id: string): Promise<Reply | undefined> {
        return this.findOne(id);
    }
}