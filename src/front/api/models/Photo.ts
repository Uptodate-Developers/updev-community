import {Post} from "./Post"
import {Reply} from "./Reply"
export class Photo {

    id:number|undefined

    url:string|undefined

    post:Post|undefined

    reply:Reply|undefined

    dateCreated: Date|undefined

}