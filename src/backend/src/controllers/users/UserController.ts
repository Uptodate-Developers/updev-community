import {Controller,Get, Req, PathParams} from "@tsed/common";
import {Description, Returns} from "@tsed/schema";
import {Authorize} from "@tsed/passport";
import {AuthProtocols} from "../../constants/AuthProtocols";
import {Inject} from "@tsed/di";
import {UserService} from "../../services/users/UserService";
import {GetUserResponse} from "../../responses/users/GetUserResponse";
import {User} from "../../entities/User";
import {StatusCodes} from "../../models/StatusCodes";
import {serialize} from "class-transformer";

@Controller("/users")
export class UserController{

    @Inject()
    private userService:UserService

    @Get("/:id")
    @Authorize(AuthProtocols.Jwt)
    @Description("renvoit un utilisateur à partir d'un Id donné")
    @Returns(200)
    @Returns(404).Description("utilisateur non trouvé")
    async getUser(
        @Description("Id de l'utilisateur")
        @PathParams("id") id: string) {

        const user = await this.userService.getUserById(id);

        if (user) {
            return serialize(<GetUserResponse>{
                status: StatusCodes.Success,
                user: user
            });
        }
        else{
            return serialize(<GetUserResponse>{
                message:"utilisateur non trouvé",
                status: StatusCodes.NotFound
            })
        }

    }
}