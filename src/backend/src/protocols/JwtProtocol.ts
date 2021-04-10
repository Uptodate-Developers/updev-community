import {Req} from "@tsed/common";
import {Arg, OnVerify, Protocol} from "@tsed/passport";
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import {appConfig} from "../config/app";
import {AuthService} from "../services/auth/AuthService";
import {Unauthorized} from "@tsed/exceptions";
import {AuthProtocols} from "../constants/AuthProtocols";

@Protocol<StrategyOptions>({
    name: AuthProtocols.Jwt,
    useStrategy: Strategy,
    settings: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: appConfig.jwtSecret,
        issuer: appConfig.jwtIssuer,
        audience: appConfig.jwtAudience
    }
})
export class JwtProtocol implements OnVerify {
    constructor(private authService: AuthService) {

    }

    async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
        const user = this.authService.getUserById(jwtPayload.id);

        if(user)
            return user;
        else
            throw new Unauthorized("Vous n'êtes pas autorisé à accéder à cette ressource");
    }
}