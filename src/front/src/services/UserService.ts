import {User} from "../../api/models"
import {plainToClass} from 'class-transformer'
import axios from "../services/Axios"
import {StatusCodes} from "../../api/models"
import {UpdateUserRequest} from "../../api/requests"

export class UserService{

    async getUserFromApi(id:string, token= ""):Promise<User|string> {
        let response = undefined;
        if(token !== "") {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            response = await axios.get(`/users/${id}`,config);
        }
        else {
            response = await axios.get(`/users/${id}`);
        }

        if(response.status == StatusCodes.Success){
            return plainToClass(User,response.data)
        }

        return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`
    }

    async updateUser(updateModel:UpdateUserRequest):Promise<User|string> {

        const response = await axios.put("/users",updateModel)
        if(response.status == StatusCodes.Success || response.status == StatusCodes.Updated){
            return plainToClass(User,response.data)
        }

        return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`
    }

}