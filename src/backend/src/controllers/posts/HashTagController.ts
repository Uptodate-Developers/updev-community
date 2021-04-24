import { Controller, Get,Post,BodyParams,QueryParams,PathParams, Res,Inject } from "@tsed/common"
import {HashtagService} from "../../services"
import {StatusCodes} from "../../http"
import {BadRequest, NotFound} from "@tsed/exceptions"
import {serialize} from "class-transformer"
import {ErrorResponse} from "../../reponses"
import {Authorize} from "@tsed/passport"
import {AuthProtocols} from "../../protocols"

@Controller("/tags")
export class HashTagController{

    @Inject()
    private hashTagService:HashtagService

    @Get()
    async getTags(@QueryParams("isPopular")isPopular:boolean,@QueryParams("skip")skip:number,@QueryParams("take")take:number,@Res() res){
        const tags = await this.hashTagService.getHashTags(isPopular ?? true,skip ?? 0, take ?? 20)
        res.status(StatusCodes.Success)
        return serialize(tags)
    }

    @Post()
    @Authorize(AuthProtocols.Jwt)
    async createTag(@BodyParams()tag:string,@Res() res){
        const regTag = await this.hashTagService.createTag(tag)
        if(regTag){
            res.status(StatusCodes.Created)
            return serialize(regTag)
        }
        return new BadRequest(serialize(<ErrorResponse>{
            status:StatusCodes.BadRequest,
            message:"Tag creation failed"
        }))
    }

    @Get("/:tag")
    async getTag(@PathParams("tag")tag:string,@Res() res){
        const regTag = await  this.hashTagService.getTag(tag)
        if(regTag){
            res.status(StatusCodes.Success)
            return serialize(regTag)
        }
        return new NotFound(serialize(<ErrorResponse>{
            status:StatusCodes.NotFound,
            message:"Tag not found"
        }))
    }
}