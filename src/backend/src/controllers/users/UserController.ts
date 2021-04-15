import {Controller,Get,Put,Res, Req, PathParams, BodyParams, Post,MulterOptions, MultipartFile, PlatformMulterFile} from "@tsed/common";
import {Description, Returns} from "@tsed/schema";
import {Authorize} from "@tsed/passport";
import {AuthProtocols} from "../../constants/AuthProtocols";
import {Inject} from "@tsed/di";
import {UserService} from "../../services/users/UserService";
import {UserResponse} from "../../responses/users/UserResponse";
import {StatusCodes} from "../../models/StatusCodes";
import {serialize} from "class-transformer";
import {UpdateUserRequest} from "../../requests/users/UpdateUserRequest";
import {FileService} from "../../services/files/FileService"
import * as multer from "multer"
import {appConfig} from "../../config/app";
import {FileUploadResponse} from "../../responses/files/FileUploadResponse";

@Controller("/users")
export class UserController{

    @Inject()
    private userService:UserService
    @Inject()
    private fileService:FileService

    @Get("/:id")
    @Authorize(AuthProtocols.Jwt)
    @Description("renvoit un utilisateur à partir d'un Id donné")
    @Returns(200)
    @Returns(404).Description("utilisateur non trouvé")
    async getUser(
        @Description("Id de l'utilisateur")
        @PathParams("id") id: string, @Res() res: Res) {

        const user = await this.userService.getUserById(id);

        if (user) {
            res.status(StatusCodes.Success)
            return serialize(<UserResponse>{
                status: StatusCodes.Success,
                user: user,
                message:"Demande réussie"
            });
        }
        else{
            res.status(StatusCodes.NotFound)
            return serialize(<UserResponse>{
                message:"utilisateur non trouvé",
                status: StatusCodes.NotFound,
                user:null
            })
        }

    }

    @Put()
    @Authorize(AuthProtocols.Jwt)
    @Returns(200)
    @Returns(404).Description("Utilisateur non trouvé")
    @Returns(400).Description("Données utilisateur de mise à jour non valides")
    async updateUser(
        @Description("Données utilisateur de mise à jour")
        @BodyParams() userModel:UpdateUserRequest,@Res() res: Res)
    {
        const updateResult = await this.userService.updateUser(userModel)
        res.status(updateResult.status)
        return serialize(updateResult)
    }

    @Post("/photo")
    @MulterOptions({storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, `${appConfig.appPublicPath}/profiles/images`)
            },
            filename: (req, file, callback) => {
                const name = `updev-${Date.now()}`
                const fileNameArray = file.originalname.split(".")
                const extension = fileNameArray[fileNameArray.length - 1]
                callback(null, name + '.' + extension)
            },
        })})
    async uploadProfilePic(@MultipartFile("file") file: MultipartFile) {

        const fileUrl = await this.fileService.getFilePublicUrl(file.path)
        return <FileUploadResponse>{
            status:StatusCodes.Success,
            fileUrl:fileUrl,
            message:"Le téléchargement du fichier a réussi"
        }
    }

}