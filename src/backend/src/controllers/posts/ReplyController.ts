import {
    Controller,
    Get,
    Post,
    BodyParams,
    QueryParams,
    PathParams,
    Res,
    Inject,
    MulterOptions,
    MultipartFile, PlatformMulterFile
} from "@tsed/common"
import {StatusCodes} from "../../http"
import {BadRequest, NotFound} from "@tsed/exceptions"
import {serialize} from "class-transformer"
import {ErrorResponse, PhotoResponse} from "../../reponses"
import {Authorize} from "@tsed/passport";
import {AuthProtocols} from "../../protocols"
import {FileService, multerStorage, PhotoService, ReplyService} from "../../services"
import {appConfig} from "../../config/app"
import {CreatePostRequest, CreateReplyRequest} from "../../requests";

@Controller("/replies")
export class ReplyController {

    @Inject()
    private photoService:PhotoService

    @Inject()
    private fileService:FileService

    @Inject()
    private replyService:ReplyService

    @Post("/photo")
    @Authorize(AuthProtocols.Jwt)
    @MulterOptions({storage:multerStorage(`${appConfig.appPublicPath}/replies/images`)})
    async uploadReplyPic(@MultipartFile("file") file: PlatformMulterFile,@Res() res){
        const url = await this.fileService.getPublicFileUrl(file.path)
        if(!url){
            const photo = await this.photoService.createPhoto(url,"")
            if(photo){
                res.status(StatusCodes.Created)
                return serialize(<PhotoResponse>{
                    url:photo.url,
                    id:photo.id.toString()
                })
            }
            return new BadRequest(serialize(<ErrorResponse>{status:StatusCodes.BadRequest,message:"Photo registration failed"}))
        }

        return new BadRequest(serialize(<ErrorResponse>{status:StatusCodes.BadRequest,message:"File upload failed, file url is not valid"}))
    }

    @Post()
    @Authorize(AuthProtocols.Jwt)
    async createReply(@BodyParams()replyRequest:CreateReplyRequest,@Res() res){
        const reply = await this.replyService.createReply(replyRequest)
        if(reply){
            res.status(StatusCodes.Created)
            return serialize(reply)
        }
        return new BadRequest(serialize(<ErrorResponse>{
            status:StatusCodes.BadRequest,
            message:`Reply creation failed,${reply}`
        }))
    }

    @Get("/user/:id")
    async getRepliesForUser(@PathParams("id")userId:string,@QueryParams("skip")skip:number,@QueryParams("take")take:number,@Res() res){
        const replies = await this.replyService.getRepliesForUser(userId,skip ?? 0, take ?? 20)
        res.status(StatusCodes.Success)
        return serialize(replies)
    }

    @Get("/post/:id")
    async getRepliesForPost(@PathParams("id")postId:string,@QueryParams("skip")skip:number,@QueryParams("take")take:number,@Res() res){
        const replies = await this.replyService.getRepliesForPost(postId,skip ?? 0, take ?? 20)
        res.status(StatusCodes.Success)
        return serialize(replies)
    }

    @Get("/reply/:id")
    async getRepliesForReply(@PathParams("id")replyId:string,@QueryParams("skip")skip:number,@QueryParams("take")take:number,@Res() res){
        const replies = await this.replyService.getRepliesForReply(replyId,skip ?? 0, take ?? 20)
        res.status(StatusCodes.Success)
        return serialize(replies)
    }
}