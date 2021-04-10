import {Inject, Req} from "@tsed/common";
import {Args, OnVerify, Protocol} from "@tsed/passport";
import {Strategy, StrategyOptions} from "passport-github2"
import {AuthService} from "../services/auth/AuthService";
import {appConfig} from "../config/app";
import {AuthProtocols} from "../constants/AuthProtocols";

@Protocol<StrategyOptions>({
    name: AuthProtocols.Github,
    useStrategy: Strategy,
    settings: {
        clientID: appConfig.githubAppId,
        clientSecret: appConfig.githubAppSecret,
        callbackURL: appConfig.githubCallbackUrl,
        passReqToCallback: true,
        scope:["email", "profile"]
    }
})
export class GoogleProtocol implements OnVerify {
    @Inject()
    private authService: AuthService;


    async $onVerify(@Req() req: Req, @Args() [accessToken, refreshToken, profile]: any) {
        profile.refreshToken = refreshToken;
        let user = await this.authService.getUserByGoogleId(profile.id);

        console.log(JSON.stringify(profile));

        //if(!user && profile.id && accessToken)
            //user = await this.authService.saveGoogleUser(profile);

        return user ? user : false;
    }
}