import { env } from '../utilities/env'
import * as Path from "path"

function getAppPath() {
    let currentDir = __dirname
    currentDir = currentDir.replace('/app/config', '')

    return currentDir
}

export const appConfig = {
    name: env('APP_NAME'),
    port: Number(env('APP_PORT')),
    routePrefix: env('APP_ROUTE_PREFIX'),
    appPublicPath: Path.resolve(getAppPath(),"public"),
    appPath: getAppPath(),
    appUrl:env('APP_URL'),

    facebookAppId:env('FACEBOOK_APP_ID'),
    facebookAppSecret:env('FACEBOOK_APP_SECRET'),
    facebookCallbackUrl:env('FACEBOOK_APP_CALLBACK_URL'),

    googleAppId:env('GOOGLE_APP_ID'),
    googleAppSecret:env('GOOGLE_APP_SECRET'),
    googleCallbackUrl:env('GOOGLE_APP_CALLBACK_URL'),

    githubAppId:env('GITHUB_APP_ID'),
    githubAppSecret:env('GITHUB_APP_SECRET'),
    githubCallbackUrl:env('GITHUB_APP_CALLBACK_URL'),

    jwtSecret:env('JWT_SECRET'),
    jwtIssuer:env('JWT_ISSUER'),
    jwtAudience:env('JWT_AUDIENCE')
}