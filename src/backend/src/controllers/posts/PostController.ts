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
import {ErrorResponse} from "../../reponses"
import {Authorize} from "@tsed/passport";
import {AuthProtocols} from "../../protocols"
import {FileService, multerStorage, PhotoService} from "../../services"
import {appConfig} from "../../config/app"

@Controller("/posts")
export class PostController {

    @Inject()
    private photoService:PhotoService

    @Inject()
    private fileService:FileService

    @Post("/photo")
    @Authorize(AuthProtocols.Jwt)
    @MulterOptions({storage:multerStorage(`${appConfig.appPublicPath}/posts/images`)})
    async uploadPostPic(@MultipartFile("file") file: PlatformMulterFile,@Res() res){
        const url = this.fileService.getPublicFileUrl(file.path)
        if(!url){
            const photo = await this.photoService.createPhoto(url,"")
            if(photo){
                res.status(StatusCodes.Created)
                return serialize(photo)
            }
            return new BadRequest(serialize(<ErrorResponse>{status:StatusCodes.BadRequest,message:"Photo registration failed"}))
        }

        return new BadRequest(serialize(<ErrorResponse>{status:StatusCodes.BadRequest,message:"File upload failed, file url is not valid"}))
    }



}