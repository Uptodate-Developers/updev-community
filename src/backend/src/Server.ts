import {Configuration, Inject, PlatformApplication, Res} from "@tsed/common"
import "@tsed/passport"
import "@tsed/typeorm"
import "@tsed/ajv"
import "@tsed/swagger"
import * as bodyParser from "body-parser"
import * as compress from "compression"
import * as cookieParser from "cookie-parser"
import * as session from "express-session"
import * as methodOverride from "method-override"
import {User} from "./entities"
import {ServerResponse} from "http"
import {appConfig} from "./config/app"
import * as path from "path"


const send = require('send');

const rootDir = __dirname;

function setCustomCacheControl(res: ServerResponse, path: string) {
    if (send.mime.lookup(path) === "text/html") {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("expires", "0");
    }
}

@Configuration({
    rootDir,
    acceptMimes: ["application/json"],
    httpPort: appConfig.port,
    httpsPort: false,
    mount: {
        "/api": [
            `${rootDir}/controllers/**/*.ts`
        ]
    },
    exclude: [
        "**/*.spec.ts"
    ],
    componentsScan: [
        `${rootDir}/protocols/*.ts`
    ],
    passport: {
        userInfoModel: User
    },
    typeorm:[
        {
            name: appConfig.typeormName,
            //@ts-ignore
            type: appConfig.dbConnection,
            host: appConfig.dbHost,
            port: appConfig.dbPort,
            username: appConfig.dbUsername,
            password: appConfig.dbPassword,
            database: appConfig.dbDatabase,
            synchronize: appConfig.dbAutoSchemaSync,
            logging: appConfig.dbLogging,
            entities: ["${rootDir}/entities/**/*.ts"],
            migrations: ["${rootDir}/database/migrations/**/*.ts"],
            subscribers: ["${rootDir}/database/subscribers/**/*.ts"],
            cli: {
                entitiesDir: "${rootDir}/entities",
                migrationsDir: "${rootDir}/database/migrations",
                subscribersDir: "${rootDir}/database/subscribers"
            }
        }
    ],
    ajv: {
        errorFormatter: (error) => `At ${error.modelName}${error.dataPath}, value '${error.data}' ${error.message}`,
        verbose: true
    },
    statics: {
        "/": [
            {
                root: `${rootDir}/public`,
                maxAge: '1d',
                setHeaders: setCustomCacheControl
            }
        ]
    },
    swagger:[{
        path: "/docs",
        specVersion: "2.0"
    }]
})
export class Server {
    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;

    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void | Promise<any> {
        this.app
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(session({secret:appConfig.sessionSecret}))
    }

    $afterRoutesInit() {
        this.app.get(`/*`, (req: any, res: Res) => {
            //@ts-ignore
            res.sendFile(path.join(`${rootDir}/public`, "index.html"))
        })
    }
}