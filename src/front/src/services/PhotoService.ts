import axios from "./Axios"
import {StatusCodes} from "../../api/models"
import {FileResponse, PhotoResponse} from "../../api/responses"
import {plainToClass} from "class-transformer"

export class PhotoService{

    async uploadUserPorfilePic(fileInfo:any):Promise<FileResponse|string>{
        const formData = new FormData()
        formData.set("file",fileInfo.originFileObj)

        const uplaodResult = await axios.post("/users/photo",formData)

        if(uplaodResult.status == StatusCodes.Success || uplaodResult.status == StatusCodes.Created)
            return plainToClass(FileResponse,uplaodResult.data)

        return `errror:Une erreur est survenue, message:${uplaodResult.data}, status:${uplaodResult.status}`
    }

    async uploadPostPic(fileInfo:any):Promise<PhotoResponse|string>{
        const formData = new FormData()
        formData.set("file",fileInfo.originFileObj)

        const uplaodResult = await axios.post("/posts/photo",formData)

        if(uplaodResult.status == StatusCodes.Success || uplaodResult.status == StatusCodes.Created)
            return plainToClass(PhotoResponse,uplaodResult.data)

        return `errror:Une erreur est survenue, message:${uplaodResult.data}, status:${uplaodResult.status}`
    }
}