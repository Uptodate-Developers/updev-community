import {Inject,Service} from "@tsed/common"
import {PhotoService} from "./PhotoService"
import {HashtagService} from "./HashtagService"
import {CreatePostRequest} from "../../requests"
import {Post} from "../../entities"
import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
import {UserService} from "../users/UserService"
import {PostRepository} from "../../repositories"
import {PostResponse} from "../../reponses"
dayjs.extend(utc)

@Service()
export class PostService{

    @Inject()
    private photoService:PhotoService

    @Inject()
    private hashtagService:HashtagService

    @Inject()
    private userService:UserService

    @Inject()
    private postRepository:PostRepository

    async createPost(postRequest:CreatePostRequest):Promise<PostResponse|string>{
        const tags = await this.hashtagService.getTags(postRequest.hashtags)
        const photos =  await this.photoService.getPhotosByIds(postRequest.photoIds.map(i => i.toString()))
        const user = await this.userService.getUser(postRequest.userId.toString())

        const post = <Post>{
            datePosted:dayjs().utc().toDate(),
            body:postRequest.body,
            title:postRequest.title,
            user:user,
            hashTags:tags,
            photos:photos
        }

        const regPost = await this.postRepository.save(post)
        if(regPost){
            this.hashtagService.updateHashTagsCount(tags.map(t => t.id.toString()),1)
            return this.getPostResponse(regPost)
        }

        return `Post registration failed,${regPost}`
    }

    async getPosts(isPopular:boolean,skip:number,take:number):Promise<PostResponse[]>{

        const posts = isPopular ? await this.postRepository.getPopularPosts(skip,take) : await this.postRepository.getRecentPosts(skip,take)
        const postResponses:PostResponse[] = []

        for(const p of posts){
            postResponses.push(await this.getPostResponse(p))
        }


        return postResponses
    }

    async getPostsForUser(userId:string,isPopular:boolean,skip:number,take:number){
        const posts = isPopular ? await this.postRepository.getPopularPostsForUser(userId,skip,take) : await this.postRepository.getRecentPostsForUser(userId,skip,take)

        const postResponses:PostResponse[] = []

        for(const p of posts){
            postResponses.push(await this.getPostResponse(p))
        }

        return postResponses
    }

    async getPostAsResponse(postId:string):Promise<PostResponse|string>{
        const post = await this.postRepository.getPost(postId)
        if(post)
            return this.getPostResponse(post)
        return "Post not found"
    }

    async getPost(postId:string):Promise<Post|undefined>{
        return this.postRepository.findByID(postId)
    }
    
    private async getPostResponse(p: Post) {
        return <PostResponse>{
            title: p.title,
            body: p.body,
            datePosted: p.datePosted,
            downvote: p.downvote,
            id: p.id,
            upvote: p.upvote,
            replyCounts: await this.getReplyCountForPost(p.id.toString()),
            hashtags: p.hashTags.map(t => t.tag),
            photoUrls: p.photos.map(p => p.url),
            user:p.user
        }
    }

    async getReplyCountForPost(postId:string):Promise<number>{
        const posts = await this.postRepository.find({where:{id:postId},relations:["replies"]})
        if(posts.length)
            return posts[0].replies.length
        return 0
    }
}