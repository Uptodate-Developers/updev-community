import {Photo} from "../../models/Photo"

export class PhotoUploadResponse{
    status:number
    photo:Photo
    message:string
}