import {Controller,Get, Req} from "@tsed/common";
import {Authorize} from "@tsed/passport";
import {AuthProtocols} from "../../constants/AuthProtocols";
import {AcceptRoles} from "../../decorators/AcceptRoles";
import {UserRoles} from "../../entities/UserRoles";

@Controller("/users")
export class UserController{
    @Get("/:id")
    @Authorize(AuthProtocols.Jwt)
    getUser(@Req() req:Req)
    {
        return "Request received";
    }

    @Get("/test")
    @AcceptRoles(UserRoles.Member)
    getTest(@Req() req:Req)
    {
        return "Request test received";
    }
}