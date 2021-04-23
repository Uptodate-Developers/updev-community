import {Controller, Get, Put, Req, PathParams, Inject, BodyParams, Res} from "@tsed/common"
import {Authorize} from "@tsed/passport"
import {AuthProtocols} from "../../protocols"
import {AcceptRoles} from "../../decorators/AcceptRoles"
import {UserRoles} from "../../entities"
import {UserService} from "../../services"
import {BadRequest, NotFound} from "@tsed/exceptions"
import {serialize} from "class-transformer"
import {ErrorResponse} from "../../reponses"
import {StatusCodes} from "../../http"
import {UpdateUserRequest} from "../../requests"

@Controller("/users")
export class UserController{

    @Inject()
    private userService:UserService

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
        const updateUserResult = this.userService.updateUser(updateModel)
        if(typeof updateUserResult == "string")
            return new BadRequest(updateUserResult)

        res.status = StatusCodes.Updated
        return serialize(updateUserResult)
    }

    @Get("/test")
    @AcceptRoles(UserRoles.Member)
    getTest(@Req() req:Req)
    {
        return "Request test received";
    }
}