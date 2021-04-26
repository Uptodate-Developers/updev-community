import {EntityRepository, Repository} from "typeorm"
import {Reply} from "../entities"

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
    findByID(id: string): Promise<Reply | undefined> {
        return this.findOne(id)
    }

    getRepliesForUser(userId:string,skip:number, take:number){
        return this.find({where:{user:{id:userId}},relations:["user","photos","hashTags"],order:{upvote:"DESC",downvote:"ASC",datePosted:"DESC"},skip:skip,take:take})
    }

    getRepliesForPost(postId:string,skip:number, take:number){
        return this.find({where:{post:{id:postId}},relations:["user","photos","hashTags"],order:{upvote:"DESC",downvote:"ASC",datePosted:"DESC"},skip:skip,take:take})
    }

    getRepliesForReply(replyId:string,skip:number, take:number){
        return this.find({where:{reply:{id:replyId}},relations:["user","photos","hashTags"],order:{upvote:"DESC",downvote:"ASC",datePosted:"DESC"},skip:skip,take:take})
    }

    getReply(replyId:string){
        return this.findOne(replyId,{relations:["user","photos","hashTags"]})
    }
}