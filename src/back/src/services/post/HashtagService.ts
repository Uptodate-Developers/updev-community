import {Service,Inject} from "@tsed/common"
import {HashTagRepository} from "../../repositories"
import { HashTag } from "../../entities"
import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
dayjs.extend(utc)

@Service()
export class HashtagService{

    @Inject()
    private hashTagRepository:HashTagRepository

    async createTag(tag:string):Promise<HashTag|undefined>{

        const regTag = await this.getTag(tag)
        if(regTag)
            return regTag

        const hashTag = <HashTag>{
            dateUpdated:dayjs().utc().toDate(),
            dateCreated:dayjs().utc().toDate(),
            tag:tag,
            taggedPostsCount:0
        }
        return this.hashTagRepository.save(hashTag)
    }

    async updateHashTagCount(tagId:string,count:number):Promise<HashTag|string>{
        const tag = await this.hashTagRepository.findByID(tagId)
        if(tag){
            tag.taggedPostsCount +=count
            const updatedTagResult = await this.hashTagRepository.update(tag.id,tag)
            if(updatedTagResult.affected)
                return tag
            return "Update failed"
        }
        return "Tag not found"
    }

    async updateHashTagsCount(tagIds:string[],count:number){
        for(const id in tagIds){
            await this.updateHashTagCount(id,count)
        }
    }

    async getHashTags(isPopular:boolean,skip:number, take:number){
        if(isPopular)
            return this.hashTagRepository.find({order:{dateUpdated:"DESC",taggedPostsCount:"DESC"},skip:skip,take:take})
        return this.hashTagRepository.find({order:{dateCreated:"DESC"},skip:skip,take:take})
    }

    async getTag(tag:string):Promise<HashTag|undefined>{
        return this.hashTagRepository.findOne({tag:tag})
    }

    async getTags(tags:string[]):Promise<HashTag[]>{
        const hashTags:HashTag[] = []

        for(const t in tags){
            const hashTag = await this.getTag(t)
            if(hashTag)
                hashTags.push(hashTag)
        }

        return hashTags
    }

}