import {EntityRepository, Repository} from "typeorm"
import {HashTag} from "../entities"

@EntityRepository(HashTag)
export class HashTagRepository extends Repository<HashTag> {
    findByID(id: string): Promise<HashTag|undefined> {
        return this.findOne(id)
    }
}