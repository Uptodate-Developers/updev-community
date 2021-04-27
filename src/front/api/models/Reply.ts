import {Post} from "./Post"
import {Photo} from "./Photo"
import {User} from "./User"

export class Reply{

    id:number|undefined


    body:string|undefined

    upvote:number|undefined

    downvote:number|undefined

    datePosted: Date = new Date()

    post: Post|undefined

    photos:Photo[] = []

    reply: Reply|undefined

    replies:Reply[] = []

    user: User|undefined
}