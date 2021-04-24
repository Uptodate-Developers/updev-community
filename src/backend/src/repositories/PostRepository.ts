import {EntityRepository, Repository} from "typeorm"
import {Post} from "../entities"

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    findByID(id: string): Promise<Post | undefined> {
        return this.findOne(id);
    }

    getRecentPosts(skip:number, take:number){
        return this.find({relations:["user","photos","hashTags"],order:{datePosted:"DESC"},skip:skip,take:take})
    }

    getPopularPosts(skip:number, take:number){
        return this.find({relations:["user","photos","hashTags"],order:{upvote:"DESC",datePosted:"DESC"},skip:skip,take:take})
    }
}
