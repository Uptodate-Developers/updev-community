import {Service,Inject} from "@tsed/common"
import {ReplyRepository, ReplyVoteRepository} from "../../repositories"
import {PhotoService} from "./PhotoService"
import {HashtagService} from "./HashtagService"
import {UserService} from "../users/UserService"
import {PostService} from "./PostService"
import {CreateReplyRequest} from "../../requests"
import {ReplyResponse} from "../../reponses"
import {ReplyVote, Reply, VoteStatus} from "../../entities"
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

    @Inject()
    private voteRepository:ReplyVoteRepository

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

    async addVote(replyId:string,userId:string,voteStatus:VoteStatus):Promise<ReplyResponse|string>{
        let reply = await this.replyRepository.getReply(replyId)
        const user = await this.userService.getUser(userId)
        if(!reply || !user)
            return "Reply or User not found"

        let replyVote = await this.voteRepository.findOne({where:{reply:{id:replyId},user:{id:userId}}})
        if(replyVote){
            if(replyVote.voteStatus == voteStatus)
                return this.getReplyResponse(reply)

            replyVote.voteStatus = voteStatus
            if(voteStatus == VoteStatus.Up){
                reply.upvote +=1
                reply.downvote -=1
            }
            else{
                reply.upvote -=1
                reply.downvote +=1
            }
        }
        else {
            replyVote = <ReplyVote>{
                user: user,
                reply: reply,
                voteStatus:voteStatus
            }
            if(voteStatus == VoteStatus.Up)
                reply.upvote +=1
            else
                reply.downvote +=1
        }

        await this.voteRepository.save(replyVote)

        reply = await this.replyRepository.save(reply)

        return this.getReplyResponse(reply)

    }

}