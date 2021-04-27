import {
    BodyParams,
    Controller,
    Get,
    Inject,
    MulterOptions,
    MultipartFile,
    PathParams,
    PlatformMulterFile,
    Post,
    Put,
    Req,
    Res
} from "@tsed/common"
import {Authorize} from "@tsed/passport"
import {AuthProtocols} from "../../protocols"
import {AcceptRoles} from "../../decorators/AcceptRoles"
import {UserRoles} from "../../entities"
import {FileService, multerStorage, UserService} from "../../services"
import {BadRequest, NotFound} from "@tsed/exceptions"
import {serialize} from "class-transformer"
import {ErrorResponse, FileResponse} from "../../reponses"
import {StatusCodes} from "../../http"
import {UpdateUserRequest} from "../../requests"
import {appConfig} from "../../config/app"

@Controller("/users")
export class UserController{

    @Inject()
    private userService:UserService

    @Inject()
    private fileService:FileService

    @Get("/:userId")
    async getUser(@PathParams("userId")userId:string) {
        const user = await this.userService.getUser(userId)
        if(typeof user == "string")
            return new NotFound(serialize(<ErrorResponse>{
                status:StatusCodes.NotFound,
                message:user
            }))
        return serialize(user)
    }

    @Put()
    @Authorize(AuthProtocols.Jwt)
    async updateUser(@BodyParams() updateModel:UpdateUserRequest, @Res() res){
        //To-do: verify that the person making the request has ownership of this resouce before updating
        const updateUserResult = await this.userService.updateUser(updateModel)
        if(typeof updateUserResult == "string")
            return new BadRequest(updateUserResult)
        return serialize(updateUserResult)
    }

    @Post("/photo")
    @Authorize(AuthProtocols.Jwt)
    @MulterOptions({storage:multerStorage(`${appConfig.appPublicPath}/profiles/images`)})
    async uploadProfilePic(@MultipartFile("file") file: PlatformMulterFile,@Res() res){
        const url = this.fileService.getPublicFileUrl(file.path)
        if(!url)
            return new BadRequest((serialize(<ErrorResponse>{
                status:StatusCodes.BadRequest,
                message:"An error occured"
            })))

        return serialize(<FileResponse>{
            url:url,
            status:StatusCodes.Success
        })
    }

    @Get("/test")
    @AcceptRoles(UserRoles.Member)
    getTest(@Req() req:Req) {
        return "Request test received"
    }
}