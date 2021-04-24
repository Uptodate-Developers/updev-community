import { env } from '../utilities/env'
import * as Path from "path"

function getAppPath() {
    let currentDir = __dirname
    currentDir = currentDir.replace('\\config', '')

    return currentDir
}

export const appConfig = {
    name: env('APP_NAME'),
    port: Number(env('APP_PORT')),
    routePrefix: env('APP_ROUTE_PREFIX'),
    appPublicPath: Path.resolve(getAppPath(),"public"),
    appPath: getAppPath(),
    appUrl:env('APP_URL'),
    appUseHttps:Boolean(env('APP_USE_HTTPS')),
    appHttpsPort:(env('APP_HTTPS_PORT')),

    facebookAppId:env('FACEBOOK_APP_ID'),
    facebookAppSecret:env('FACEBOOK_APP_SECRET'),
    facebookCallbackUrl:env('FACEBOOK_APP_CALLBACK_URL'),

    googleAppId:env('GOOGLE_APP_ID'),
    googleAppSecret:env('GOOGLE_APP_SECRET'),
    googleCallbackUrl:env('GOOGLE_APP_CALLBACK_URL'),

    githubAppId:env('GITHUB_APP_ID'),
    githubAppSecret:env('GITHUB_APP_SECRET'),
    githubCallbackUrl:env('GITHUB_APP_CALLBACK_URL'),

    twitterAppId:env('TWITTER_APP_ID'),
    twitterAppSecret:env('TWITTER_APP_SECRET'),
    twitterCallbackUrl:env('TWITTER_APP_CALLBACK_URL'),

    jwtSecret:env('JWT_SECRET'),
    jwtIssuer:env('JWT_ISSUER'),
    jwtAudience:env('JWT_AUDIENCE'),

    typeormName: "default",
    dbConnection:env('TYPEORM_CONNECTION'),
    dbHost:env('TYPEORM_HOST'),
    dbPort:Number(env('TYPEORM_PORT')),
    dbUsername:env('TYPEORM_USERNAME'),
    dbPassword:env('TYPEORM_PASSWORD'),
    dbDatabase:env('TYPEORM_DATABASE'),
    dbAutoSchemaSync:Boolean(env('TYPEORM_AUTO_SCHEMA_SYNC')),
    dbLogging:Boolean(env('TYPEORM_LOGGING')),

    sessionSecret:env('SESSION_SECRET')

}