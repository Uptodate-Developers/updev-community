import {Inject, Req} from "@tsed/common"
import {Args, OnVerify, Protocol} from "@tsed/passport"
import {Strategy, StrategyOptions} from "passport-facebook"
import {AuthService} from "../services"
import {appConfig} from "../config/app"
import {AuthProtocols} from "./AuthProtocols"


@Protocol<StrategyOptions>({
    name: AuthProtocols.Facebook,
    useStrategy: Strategy,
    settings: {
        clientID: appConfig.facebookAppId,
        clientSecret: appConfig.facebookAppSecret,
        callbackURL: appConfig.facebookCallbackUrl,
        profileFields: ["id", "emails", "name"]
    }
})
export class FacebookProtocol implements OnVerify {
    @Inject()
    private authService: AuthService;

    async $onVerify(@Req() req: Req, @Args() [accessToken, refreshToken, profile]: any) {
        profile.refreshToken = refreshToken;

        let user = await this.authService.getUserByFacebookId(profile.id);

        if(!user && profile.id && accessToken)
            user = await this.authService.saveFacebookUser(profile,accessToken);

        return user ? user : false;
    }
}