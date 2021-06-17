import axios from "../services/Axios"
import {NotificationResponse} from "../../api/responses"
import {StatusCodes} from "../../api/models"

export class NotificationService{

    async getNotifications(userId:string,skip:number,take:number):Promise<NotificationResponse[]|string>{
        const response = await axios.get(`/notifications/user/${userId}?skip=${skip}&take=${take}`)
        if(response.status == StatusCodes.Success){
            const notifications: NotificationResponse[] = []
            for (let item of response.data) {
                notifications.push(item)
            }
            return notifications
        }
        return `error:Une erreur est survenue, message:${response.data}, status:${response.status}`
    }
}