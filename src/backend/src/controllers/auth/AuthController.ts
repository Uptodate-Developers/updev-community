import { Controller, Get, Req,Inject } from "@tsed/common"
import {Authenticate, Authorize} from "@tsed/passport"
import {plainToClass, serialize} from 'class-transformer'
import {AuthService} from "../../services"
import {User} from "../../entities"
import {AuthProtocols} from "../../protocols"
import {AuthResponse} from "../../reponses"
import {BadRequest} from "@tsed/exceptions"
import {StatusCodes} from "../../http";

@Controller("/auth")
export class AuthController {
    @Inject()
    private authService: AuthService

    @Get("/facebook",)
    @Authenticate(AuthProtocols.Facebook)
    facebookAuthentication(@Req() req: Req) {
        return "Facebook auth request received"
    }

    @Get("/facebook/callback")
    @Authenticate(AuthProtocols.Facebook)
    facebookCallback(@Req("user") user: Req) {
        return this.getAuthResponse(user)
    }

    @Get("/google")
    @Authenticate(AuthProtocols.Google)
    googleAuthentication(@Req() req: Req) {
        return "Google auth request received"
    }

    @Get("/google/callback")
    @Authenticate(AuthProtocols.Google)
    googleCallback(@Req("user") user: Req) {
        return this.getAuthResponse(user);
    }

    @Get("/github")
    @Authenticate(AuthProtocols.Github)
    githubAuthentication(@Req() req: Req) {
        return "Github auth request received"
    }

    @Get("/github/callback")
    @Authenticate(AuthProtocols.Google)
    githubCallback(@Req("user") user: Req) {
        return this.getAuthResponse(user)
    }

    @Get("/twitter")
    @Authenticate(AuthProtocols.Twitter)
    twitterAuthentication(@Req() req: Req) {
        return "Twitter auth request received"
    }

    @Get("/twitter/callback")
    @Authenticate(AuthProtocols.Twitter)
    twitterCallback(@Req("user") user: Req) {
        return this.getAuthResponse(user);
    }

    @Get("/logout")
    logout(@Req() req: Req) {
        //@ts-ignore
        req.logout()
        return "Vous avez été déconnecté avec succès"
    }

    private getAuthResponse(user: Req) {
        const loggedUser = plainToClass(User,user)
        if(loggedUser) {
            return serialize(<AuthResponse>{
                message: "Vous êtes authentifié",
                user: user,
                status: StatusCodes.Success,
                token: this.authService.generateToken(loggedUser)
            })
        }
        else
        {
            return new BadRequest(serialize(<AuthResponse>{
                message:"Authentification échouée",
                user:user,
                status:StatusCodes.BadRequest,
                token:""
            }))
        }
    }
}