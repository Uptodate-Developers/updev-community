import {Description, Example, Property, Title} from "@tsed/schema";
export class AuthResponse{
    message:string;
    user:any;
    status:number;
    token: string;
}