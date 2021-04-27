import {EntityRepository, Repository} from "typeorm"
import {User} from "../entities"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByID(id: string): Promise<User | undefined> {
        return this.findOne(id);
    }

    findByFacebookProfileId(id:string):Promise<User|undefined>{
        return this.findOne({ where: { facebookProfileId: id} })
    }

    findByGoogleProfileId(id:string):Promise<User|undefined>{
        return this.findOne({ where: { googleProfileId: id} })
    }

    findByTwitterProfileId(id:string):Promise<User|undefined>{
        return this.findOne({ where: { twitterProfileId: id} })
    }

    findByGithubProfileId(id:string):Promise<User|undefined>{
        return this.findOne({ where: { githubProfileId: id} })
    }
}