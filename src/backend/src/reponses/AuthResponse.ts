import {User} from "../entities"

export class AuthResponse{
    message:string

    user:User|undefined

    status:string

    token: string
}