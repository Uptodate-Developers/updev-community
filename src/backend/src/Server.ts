import {Configuration, Inject, PlatformApplication, Res} from "@tsed/common";
import "@tsed/passport";
import "@tsed/typeorm";
import "@tsed/ajv";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as methodOverride from "method-override";
import typeormConfig from "./config/typeorm";
import {User} from "./entities/User";
import {ServerResponse} from "http";
import * as cors from "cors";
import * as multer from "multer";


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
    httpPort: process.env.PORT || 5000,
    httpsPort: false, // CHANGE
    mount: {
        "/api": [
            `${rootDir}/controllers/**/*.ts`
        ]
    },
    exclude: [
        "**/*.spec.ts"
    ],
    componentsScan: [
        `${rootDir}/protocols/*.ts` // scan protocols directory
    ],
    passport: {
        userInfoModel: User
    },
    typeorm:[
    {
        name: "default",
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "admin",
        password: "updev@2020",
        database: "updevcommunity",
        synchronize: true,
        logging: true,
        timezone: 'Z',
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
    }],
    uploadDir: `${rootDir}/public`,
    multer:{
        dest: `${rootDir}/public`,

    }
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
            .use(cors())
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));
        this.app.getApp().set("trust proxy", 1);
        this.app.getApp().use(session({
            secret: "8647916702SecretKey",
            resave: false,
            saveUninitialized: true,
            // maxAge: 36000,
            cookie: {
                path: "/",
                httpOnly: true,
                secure: false,
                maxAge: null
            }
        }));
    }

    $afterRoutesInit() {
        this.app.get(`/*`, (req: any, res: Res) => {
            res.sendFile("index.html", `${rootDir}/public`);
        });
    }
}