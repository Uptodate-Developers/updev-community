import {StatusCodes} from "../http"

export class AuthResponse{
    message:string

    user:any

    status:StatusCodes

    token: string
}