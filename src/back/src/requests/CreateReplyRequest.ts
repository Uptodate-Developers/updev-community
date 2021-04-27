export class CreateReplyRequest{
    body:string
    hashtags:string[]
    photoIds:number[]
    postId:number
    replyId:number|undefined
    userId:number
}