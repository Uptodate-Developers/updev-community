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
        const regPhoto = await this.getPhoto(url)
        if(regPhoto)
            return regPhoto

        console.log(regPhoto)
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

    async  getPhotoById(id:string):Promise<Photo|undefined>{
        return this.photoRepository.findByID(id)
    }

    async getPhotosByIds(ids:string[]):Promise<Photo[]>{
        const photos:Photo[] = []
        for(const id of ids){
            const photo = await this.getPhotoById(id)
            if(photo)
                photos.push(photo)
        }
        return photos
    }


}