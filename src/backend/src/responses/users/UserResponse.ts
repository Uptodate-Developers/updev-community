import {User} from "../../entities/User";

export class UserResponse {
    message:string;
    user:User|null;
    status:number;
}