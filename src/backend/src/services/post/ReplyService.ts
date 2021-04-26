import {Service,Inject} from "@tsed/common"
import {ReplyRepository} from "../../repositories"
import {PhotoService} from "./PhotoService"
import {HashtagService} from "./HashtagService"
import {UserService} from "../users/UserService"
import {PostService} from "./PostService"
import {CreateReplyRequest} from "../../requests"
import {ReplyResponse} from "../../reponses"
import {Reply} from "../../entities"
import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
dayjs.extend(utc)

@Service()
export class ReplyService{

    @Inject()
    private photoService:PhotoService

    @Inject()
    private hashtagService:HashtagService

    @Inject()
    private userService:UserService

    @Inject()
    private postService:PostService

    @Inject()
    private replyRepository:ReplyRepository

    async createReply(replyRequest:CreateReplyRequest):Promise<ReplyResponse|string>{
        const tags = await this.hashtagService.getTags(replyRequest.hashtags)
        const photos = replyRequest?.photoIds?.length ?  await this.photoService.getPhotosByIds(replyRequest.photoIds.map(i => i.toString())) : []
        const user = await this.userService.getUser(replyRequest.userId.toString())
        const post = await this.postService.getPost(replyRequest.postId.toString())
        const parentReply = replyRequest?.replyId ? await this.replyRepository.findByID(replyRequest.replyId.toString()) : undefined

        const reply = <Reply>{
            datePosted:dayjs().utc().toDate(),
            body:replyRequest.body,
            user:user,
            hashTags:tags,
            photos:photos,
            post:post,
            reply:parentReply
        }

        const regReply = await this.replyRepository.save(reply)
        if(regReply){
            this.hashtagService.updateHashTagsCount(tags.map(t => t.id.toString()),1)
            return this.getReplyResponse(regReply)
        }

        return `Reply registration failed,${regReply}`
    }

    async getRepliesForPost(postId:string,skip:number,take:number):Promise<ReplyResponse[]>{

        const replies = await this.replyRepository.getRepliesForPost(postId,skip,take)
        const replyResponses:ReplyResponse[] = []

        for(const r of replies){
            replyResponses.push(await this.getReplyResponse(r))
        }
        return replyResponses
    }

    async getRepliesForReply(replyId:string,skip:number,take:number):Promise<ReplyResponse[]>{

        const replies = await this.replyRepository.getRepliesForReply(replyId,skip,take)
        const replyResponses:ReplyResponse[] = []

        for(const r of replies){
            replyResponses.push(await this.getReplyResponse(r))
        }
        return replyResponses
    }

    async getRepliesForUser(userId:string,skip:number,take:number):Promise<ReplyResponse[]>{

        const replies = await this.replyRepository.getRepliesForUser(userId,skip,take)
        const replyResponses:ReplyResponse[] = []

        for(const r of replies){
            replyResponses.push(await this.getReplyResponse(r))
        }
        return replyResponses
    }

    async getReplyCountForReply(replyId:string):Promise<number>{
        const replies = await this.replyRepository.find({where:{id:replyId},relations:["replies"]})
        if(replies.length)
            return replies[0].replies.length
        return 0
    }

    private async getReplyResponse(p: Reply) {
        return <ReplyResponse>{
            body: p.body,
            datePosted: p.datePosted,
            downvote: p.downvote,
            id: p.id,
            upvote: p.upvote,
            replyCounts: await this.getReplyCountForReply(p.id.toString()),
            hashtags: p.hashTags.map(t => t.tag),
            photoUrls: p.photos.map(p => p.url),
            user:p.user
        }
    }

}