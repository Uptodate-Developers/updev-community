import {Service,Inject} from "@tsed/common"
import {UserRepository} from "../../repositories"
import {User} from "../../entities"
import {UpdateUserRequest} from "../../requests"
import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
dayjs.extend(utc)

@Service()
export class UserService{

    @Inject()
    private userRepository:UserRepository

    async getUser(userId:string):Promise<User|string>{
        const user = await this.userRepository.findByID(userId)
        if(user)
            return user

        return "Utilisateur non trouvé"
    }

    async updateUser(updateModel:UpdateUserRequest):Promise<User|string>{
        const user = await this.getUser(updateModel.userId)
        if(typeof user == "string")
            return user

        user.dateUpdated = dayjs().utc().toDate()
        user.name = updateModel.name
        user.bio = updateModel.bio
        user.email= updateModel.email
        user.profilePicUrl = updateModel.profilePic
        user.profession = updateModel.profession
        user.facebookProfileLink = updateModel.facebookProfileLink
        user.firstName = updateModel.firstName
        user.lastName = updateModel.lastName
        user.githubProfileLink = updateModel.githubProfileLink
        user.twitterProfileLink = updateModel.twitterProfileLink
        user.phoneNumber = updateModel.phoneNumber

        const updatedUser =  await this.userRepository.save(user)

        if(updatedUser)
            return updatedUser
        return `Update failed,${updatedUser}`

    }
}