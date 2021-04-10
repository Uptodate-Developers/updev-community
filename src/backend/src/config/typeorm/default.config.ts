export default {
    name: "default",
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    logging: process.env.TYPEORM_LOGGING,
    entities: ["${rootDir}/entities/**/*.ts"],
    migrations: ["${rootDir}/database/migrations/**/*.ts"],
    subscribers: ["${rootDir}/database/subscribers/**/*.ts"],
    cli: {
        entitiesDir: "${rootDir}/entities",
        migrationsDir: "${rootDir}/database/migrations",
        subscribersDir: "${rootDir}/database/subscribers"
    }
};