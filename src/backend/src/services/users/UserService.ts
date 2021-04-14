import {Service,Inject} from "@tsed/di";
import {UserRepository} from "../../repositories/users/UserRepository"
import {User} from "../../entities/User";
import {UpdateUserRequest} from "../../requests/users/UpdateUserRequest";
import {UserResponse} from "../../responses/users/UserResponse";
import {StatusCodes} from "../../models/StatusCodes";
import * as dayjs from 'dayjs'
import * as utc from "dayjs/plugin/utc"

dayjs.extend(utc)

@Service()
export class UserService{
    @Inject()
    private userRepository:UserRepository

    async getUserById(id:string):Promise<User|undefined>
    {
        return await this.userRepository.findByID(id);
    }

    async updateUser(userUpdateData:UpdateUserRequest):Promise<UserResponse>
    {
        if(userUpdateData)
        {
            const user = await this.userRepository.findByID(userUpdateData.userId)
            if(user)
            {
                user.email =  userUpdateData.email;
                user.bio = userUpdateData.bio;
                user.profession = userUpdateData.profession;
                user.firstName = userUpdateData.firstName;
                user.lastName = userUpdateData.lastName;
                user.phoneNumber = userUpdateData.phoneNumber;
                user.name = userUpdateData.name;
                user.profilePicUrl = userUpdateData.profilePic;
                user.dateUpdated = dayjs.utc().toDate()

                await this.userRepository.update(userUpdateData.userId,user);
                return <UserResponse>{
                    message:"Mise à jour réussie",
                    user:user,
                    status: StatusCodes.Success
                }
            }

            return <UserResponse>{
                message:"Utilisateur non trouvé",
                user:null,
                status:StatusCodes.NotFound
            }
        }

        return <UserResponse>{
            message:"Données utilisateur de mise à jour non valides",
            user:null,
            status:StatusCodes.BadRequest
        };
    }
}