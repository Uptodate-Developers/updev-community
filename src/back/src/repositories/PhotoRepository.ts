import {EntityRepository, Repository} from "typeorm"
import {Photo} from "../entities"

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
    findByID(id: string): Promise<Photo|undefined> {
        return this.findOne(id)
    }
}