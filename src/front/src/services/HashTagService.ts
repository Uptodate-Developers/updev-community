import axios from "./Axios"
import {StatusCodes} from "../../api/models"
import {plainToClass} from "class-transformer"
import {CreateHashtagRequest} from "../../api/requests"
import {HashTagResponse} from "../../api/responses"
import {LocalStorageKeys} from "../constants/LocalStorageKeys"
import {LocalTags} from "../models"

export class HashTagService{

    get selectedTags():string[]{
        const tags = sessionStorage.getItem(LocalStorageKeys.Tags)
        if(tags)
            return JSON.parse(tags)
        return []
    }

    set selectedTags(v){
        if(v)
            sessionStorage.setItem(LocalStorageKeys.Tags,JSON.stringify(v))
    }

    async getTags(isPopular:boolean,skip:number,take:number):Promise<string[]|string>{
        const hashTagsResponse = await axios.get(`/tags?isPopular=${isPopular}&skip=${skip}&take=${take}`)

        if(hashTagsResponse.status == StatusCodes.Success){
            const tags:string[] = hashTagsResponse.data.map((t: { tag: any }) => t.tag)
            return tags
        }

        return `error:Une erreur est survenue, message:${hashTagsResponse.data}, status:${hashTagsResponse.status}`
    }

    async createTag(tagRequest:CreateHashtagRequest){
        const hashTagPostResult = await axios.post("/tags",tagRequest)
        if(hashTagPostResult.status == StatusCodes.Success || hashTagPostResult.status == StatusCodes.Created){
            return plainToClass(HashTagResponse,hashTagPostResult.data)
        }
        return `error:Une erreur est survenue, message:${hashTagPostResult.data}, status:${hashTagPostResult.status}`
    }

    public checkSelectedTags(tags:string[],selectedTags:string[]):LocalTags[]{
        const localTags:LocalTags[] = []
        for (const tag of tags){
            localTags.push(<LocalTags>{
                tag:tag,
                selected:selectedTags.some(t => t == tag)
            })
        }
        return localTags
    }



}