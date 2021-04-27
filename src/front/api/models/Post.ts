import {Reply} from "./Reply"
import {Photo} from "./Photo"
import {HashTag} from "./HashTag"
import {User} from "./User"
export class Post{
    id:number|undefined
    title:string|undefined
    body:string|undefined
    upvote:number|undefined
    downvote:number|undefined
    datePosted: Date|undefined
    replys: Reply[]|undefined

    photos:Photo[]|undefined

    hashTags: HashTag[]|undefined

    user: User|undefined

}