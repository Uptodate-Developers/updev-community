import {EntityRepository, Repository} from "typeorm"
import {Post} from "../entities"

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    findByID(id: string): Promise<Post | undefined> {
        return this.findOne(id);
    }
}