import {EndpointInfo, Middleware, Req, HeaderParams, Inject} from "@tsed/common";
import {Unauthorized} from "@tsed/exceptions";
import {AuthService} from "../services/auth/AuthService";
import {appConfig} from "../config/app";
import * as jwt from "jsonwebtoken";

@Middleware()
export class AcceptRolesMiddleware {

    @Inject()
    private authService:AuthService;
    use(@Req() req: Req,@HeaderParams("authorization") token: string, @EndpointInfo() endpoint: EndpointInfo) {

        if(token.trim() == "Bearer")
            throw  new Unauthorized("Jeton ivalide");

        const jwtToken = token.replace("Bearer","").trim();
        const roles = endpoint.get(AcceptRolesMiddleware);

    }
}