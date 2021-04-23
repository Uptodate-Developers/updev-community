import {Service,Inject} from "@tsed/common"
import {UserRepository} from "../../repositories"
import {User} from "../../entities"
import { classToPlain } from 'class-transformer'
import {UserRoles} from "../../entities"
import Axios from "axios"
import {FileService} from "../files/FileService"
import {appConfig} from "../../config/app"
import * as jwt from "jsonwebtoken"
import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
dayjs.extend(utc)

@Service()
export class AuthService{
    @Inject()
    private userRepository: UserRepository;
    @Inject()
    private fileService: FileService;

    async  getUserById(id:string):Promise<User|undefined> {
        return await this.userRepository.findByID(id);
    }

    async getUserByFacebookId(id:string):Promise<User | undefined> {
        return await this.userRepository.findByFacebookProfileId(id);
    }

    async saveFacebookUser(profile:any, accessToken:string):Promise<User>{

        const profilePicResponse = await Axios.get(`https://graph.facebook.com/${profile.id}/picture?type=large&redirect=false&access_token=${accessToken}`);
        const profileImagePath = await this.fileService.downloadImage(profilePicResponse.data.data.url,"profiles/images",`${profile.name.givenName}${profile.name.middleName}${profile.name.familyName}.jpg`);

        const createdDate = dayjs.utc().toDate()
        const user = <User>{
            firstName : profile.name.middleName,
            lastName: profile.name.familyName,
            facebookProfileId: profile.id,
            email:profile._json.email,
            name :profile.name.givenName,
            profilePicUrl:profileImagePath,
            role:UserRoles.Member,
            dateCreated:createdDate,
            dateUpdated:createdDate
        }

        return this.userRepository.save(user);
    }

    async getUserByGoogleId(id:string):Promise<User|undefined> {
        return await  this.userRepository.findByGoogleProfileId(id);
    }

    async saveGoogleUser(profile:any) {
        const createdDate = dayjs.utc().toDate()
        const user = <User>{
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            email:profile.email,
            name:profile.firstName,
            role:UserRoles.Member,
            profilePicUrl:profile.picture,
            googleProfileId:profile.id,
            dateCreated:createdDate,
            dateUpdated:createdDate
        }

        return this.userRepository.save(user);
    }

    async getUserByTwitterId(id:string):Promise<User | undefined> {
        return await this.userRepository.findByTwitterProfileId(id);
    }
    async saveTwitterUser(profile:any, accessToken:string):Promise<User>{

        const profilePicResponse = await Axios.get(`https://graph.facebook.com/${profile.id}/picture?type=large&redirect=false&access_token=${accessToken}`);
        const profileImagePath = await this.fileService.downloadImage(profilePicResponse.data.data.url,"profiles/images",`${profile.name.givenName}${profile.name.middleName}${profile.name.familyName}.jpg`);

        const createdDate = dayjs.utc().toDate()
        const user = <User>{
            firstName : profile.name.middleName,
            lastName: profile.name.familyName,
            facebookProfileId: profile.id,
            email:profile._json.email,
            name :profile.name.givenName,
            profilePicUrl:profileImagePath,
            role:UserRoles.Member,
            dateCreated:createdDate,
            dateUpdated:createdDate
        }

        return this.userRepository.save(user);
    }

    generateToken(user:User):string {
        const token = jwt.sign(classToPlain(user),appConfig.jwtSecret,{expiresIn:'24h', audience:appConfig.jwtAudience, issuer:appConfig.jwtIssuer});
        return token;
    }

    isValidToken(token:string):any {
        return jwt.verify(token,appConfig.jwtSecret,{issuer:appConfig.jwtIssuer,audience:appConfig.jwtAudience})
    }


}