import {Service,Inject} from "@tsed/common"
import {PhotoRepository} from "../../repositories"
import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
import {Photo} from "../../entities"
dayjs.extend(utc)

@Service()
export class PhotoService{

    @Inject()
    private photoRepository:PhotoRepository

    async createPhoto(url:string,description:string):Promise<Photo|undefined>{
        const regPhoto = this.getPhoto(url)
        if(regPhoto)
            return regPhoto

        const newPhoto = <Photo>{
            dateCreated:dayjs().utc().toDate(),
            url:url,
            description:description
        }

        return this.photoRepository.save(newPhoto)
    }

    async getPhoto(url:string):Promise<Photo|undefined>{
        return this.photoRepository.findOne({url:url})
    }

}