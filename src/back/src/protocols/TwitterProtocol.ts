import {Inject, Req} from "@tsed/common"
import {Args, OnVerify, Protocol} from "@tsed/passport"
import {Strategy, StrategyOptions} from "passport-twitter"
import {AuthService} from "../services"
import {appConfig} from "../config/app"
import {AuthProtocols} from "./AuthProtocols"


@Protocol<StrategyOptions>({
    name: AuthProtocols.Twitter,
    useStrategy: Strategy,
    settings: {
        consumerKey: appConfig.twitterAppId,
        consumerSecret: appConfig.twitterAppSecret,
        callbackURL: appConfig.twitterCallbackUrl,
        profileFields: ["id", "emails", "name"]
    }
})
export class TwitterProtocol implements OnVerify {
    @Inject()
    private authService: AuthService

    async $onVerify(@Req() req: Req, @Args() [accessToken, refreshToken, profile]: any) {
        profile.refreshToken = refreshToken

        let user = await this.authService.getUserByTwitterId(profile.id);

        if(!user && profile.id && accessToken)
            user = await this.authService.saveTwitterUser(profile);

        return user ? user : false
    }
}