export class CreatePostRequest{

    title:string|undefined

    body:string|undefined

    hashtags:string[]=[]

    photoIds:number[]=[]

    userId:number|undefined
}