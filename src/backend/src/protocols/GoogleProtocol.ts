import {Inject, Req} from "@tsed/common";
import {Args, OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy, StrategyOptions} from "passport-google-oauth2"
import {AuthService} from "../services/auth/AuthService";
import {appConfig} from "../config/app";
import {AuthProtocols} from "../constants/AuthProtocols";

@Protocol<StrategyOptions>({
    name: AuthProtocols.Google ,
    useStrategy: Strategy,
    settings: {
        clientID: appConfig.googleAppId,
        clientSecret: appConfig.googleAppSecret,
        callbackURL: appConfig.googleCallbackUrl,
        profileFields: ["email", "profile"],
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

        if(!user && profile.id && accessToken)
            user = await this.authService.saveGoogleUser(profile);

        return user ? user : false;
    }
}