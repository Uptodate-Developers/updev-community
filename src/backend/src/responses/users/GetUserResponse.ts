import {User} from "../../entities/User";

export class GetUserResponse{
    message:string;
    user:User;
    status:number;
}