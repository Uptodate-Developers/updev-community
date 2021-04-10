import {Service,Inject} from "@tsed/common";
import {UserRepository} from "../../repositories/user/UserRepository";
import {User} from "../../entities/User";
import { classToPlain } from 'class-transformer';
import {UserRoles} from "../../entities/UserRoles";
import Axios from "axios";
import {FileService} from "../files/FileService";
import {appConfig} from "../../config/app";
import * as jwt from "jsonwebtoken";

@Service()
export class AuthService{
    @Inject()
    private userRepository: UserRepository;
    @Inject()
    private fileService: FileService;

    async  getUserById(id:string):Promise<User|undefined>
    {
        return await this.userRepository.findByID(id);
    }

    async getUserByFacebookId(id:string):Promise<User | undefined>
    {
        return await this.userRepository.findByFacebookProfileId(id);
    }

    async getUserByGoogleId(id:string):Promise<User|undefined>
    {
        return await  this.userRepository.findByGoogleProfileId(id);
    }

    async saveFacebookUser(profile:any, accessToken:string):Promise<User>{

        const profilePicResponse = await Axios.get(`https://graph.facebook.com/${profile.id}/picture?type=large&redirect=false&access_token=${accessToken}`);
        const profileImagePath = await this.fileService.downloadImage(profilePicResponse.data.data.url,"profiles/images",`${profile.name.givenName}${profile.name.middleName}${profile.name.familyName}.jpg`);

        const user = <User>{
            firstName : profile.name.middleName,
            lastName: profile.name.familyName,
            facebookProfileId: profile.id,
            email:profile._json.email,
            name :profile.name.givenName,
            profilePicUrl:profileImagePath,
            role:UserRoles.Member
        }

        return this.userRepository.save(user);
    }

    async saveGoogleUser(profile:any)
    {
        const user = <User>{
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            email:profile.email,
            name:profile.firstName,
            role:UserRoles.Member,
            profilePicUrl:profile.picture,
            googleProfileId:profile.id
        }

        return this.userRepository.save(user);
    }

    generateToken(user:User):string
    {
        const token = jwt.sign(classToPlain(user),appConfig.jwtSecret,{expiresIn:'24h', audience:appConfig.jwtAudience, issuer:appConfig.jwtIssuer});
        return token;
    }

    isValidToken(token:string):any
    {
        return jwt.verify(token,appConfig.jwtSecret,{issuer:appConfig.jwtIssuer,audience:appConfig.jwtAudience})
    }

    getJwtPayLoad(token:string):any
    {
        return jwt.decode(token);
    }

}