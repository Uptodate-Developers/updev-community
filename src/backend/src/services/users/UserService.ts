import {Service,Inject} from "@tsed/di";
import {UserRepository} from "../../repositories/users/UserRepository"
import {User} from "../../entities/User";

@Service()
export class UserService{
    @Inject()
    private userRepository:UserRepository

    async getUserById(id:string):Promise<User|undefined>
    {
        return await this.userRepository.findByID(id);
    }
}