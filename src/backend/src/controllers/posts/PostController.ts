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
import {FileService, multerStorage, PhotoService} from "../../services"
import {appConfig} from "../../config/app"
import { CreatePostRequest} from "../../requests"
import {PostService} from "../../services/post/PostService"

@Controller("/posts")
export class PostController {

    @Inject()
    private photoService:PhotoService

    @Inject()
    private fileService:FileService

    @Inject()
    private postService:PostService

    @Post("/photo")
    @Authorize(AuthProtocols.Jwt)
    @MulterOptions({storage:multerStorage(`${appConfig.appPublicPath}/posts/images`)})
    async uploadPostPic(@MultipartFile("file") file: PlatformMulterFile,@Res() res){

        const url = await this.fileService.getPublicFileUrl(file.path)

        if(url){
            const photo = await this.photoService.createPhoto(url,"")
            console.log(photo)
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
    async createPost(@BodyParams()postRequest:CreatePostRequest,@Res() res){
        const post = await this.postService.createPost(postRequest)
        if(post){
            res.status(StatusCodes.Created)
            return serialize(post)
        }
        return new BadRequest(serialize(<ErrorResponse>{
            status:StatusCodes.BadRequest,
            message:`Post creation failed,${post}`
        }))
    }

    @Get()
    async getPosts(@QueryParams("isPopular")isPopular:boolean,@QueryParams("skip")skip:number,@QueryParams("take")take:number,@Res() res){
        const posts = await this.postService.getPosts(isPopular ?? true,skip ?? 0, take ?? 20)
        res.status(StatusCodes.Success)
        return serialize(posts)
    }

    @Get("/:id")
    async getPost(@PathParams("id")postId:string){
        const postResponse = await this.postService.getPostAsResponse(postId)
        if(typeof postResponse == "string")
            return new BadRequest(postResponse)
        return serialize(postResponse)
    }

    @Get("/user/:id")
    async getPostsForUser(@PathParams("id")userId:string,@QueryParams("isPopular")isPopular:boolean,@QueryParams("skip")skip:number,@QueryParams("take")take:number){
        const posts = await this.postService.getPostsForUser(userId,isPopular ?? true,skip ?? 0,take ?? 20)
        return serialize(posts)
    }

}