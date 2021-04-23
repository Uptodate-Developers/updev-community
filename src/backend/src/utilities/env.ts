import * as dotenv from 'dotenv'
dotenv.config({path:__dirname.replace('src\\utilities','') + '.env'})

export function env(key: string): string {

    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string
}