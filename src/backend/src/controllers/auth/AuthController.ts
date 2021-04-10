import { Controller, Get, Req,PathParams,Inject } from "@tsed/common";
import {Authenticate, Authorize} from "@tsed/passport";
import { plainToClass } from 'class-transformer';
import {AuthService} from "../../services/auth/AuthService";
import {User} from "../../entities/User";
import {AuthProtocols} from "../../constants/AuthProtocols";
import {AuthResponse} from "../../responses/auth/AuthResponse";

@Controller("/auth")
export class AuthController {
    @Inject()
    private authService: AuthService;

    @Get("/facebook",)
    @Authenticate(AuthProtocols.Facebook)
    facebookAuthentication(@Req() req: Req) {
        return "Facebook auth request received"
    }

    @Get("/facebook/callback")
    @Authenticate(AuthProtocols.Facebook)
    facebookCallback(@Req("user") user: Req) {
        return this.getAuthResponse(user);
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
        return this.getAuthResponse(user);
    }

    private getAuthResponse(user: Req) {
        if(user) {
            return <AuthResponse>{
                message: "Vous êtes authentifié",
                user: user,
                status: '200',
                token: this.authService.generateToken(plainToClass(User, user))
            };
        }
        else
        {
            return <AuthResponse>{
                message:"Authentification échouée",
                user:user,
                status:'400',
                token:""
            }
        }
    }
}