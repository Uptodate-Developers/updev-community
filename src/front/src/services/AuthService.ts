import {LocalStorageKeys} from '../constants/LocalStorageKeys'
import {User} from "../../api/models/User"
import { plainToClass} from 'class-transformer'
import axios from "axios"

export class AuthService{

    private timeToLive = 86400000

    get jwtToken():(string | null){
        const itemStr = localStorage.getItem(LocalStorageKeys.JwtToken)
        if(!itemStr)
            return null;

        const item = JSON.parse(itemStr)
        const now = new Date()
        if(now.getTime() > item.expiry)
        {
            localStorage.removeItem(LocalStorageKeys.JwtToken)
            return null;
        }
        return item.value;
    }
    set jwtToken(v) {
        if(v)
        {
            const now = new Date();
            const item = {
                value: v,
                expiry: now.getTime() + this.timeToLive,
            }
            localStorage.setItem(LocalStorageKeys.JwtToken,JSON.stringify(item));
        }
    }

    get isAuthenticated():Boolean{
        return this.jwtToken ? true : false;
    }

    get user():(User|null) {

        const itemStr = localStorage.getItem(LocalStorageKeys.User)
        if(!itemStr)
            return null

        const item = JSON.parse(itemStr)
        const now = new Date()
        if(now.getTime() > item.expiry)
        {
            localStorage.removeItem(LocalStorageKeys.User)
            return null;
        }
        return plainToClass(User,item.value)
    }
    set user(v)
    {
        if(v) {
            const now = new Date();
            const item = {
                value: v,
                expiry: now.getTime() + this.timeToLive,
            }
            localStorage.setItem(LocalStorageKeys.User, JSON.stringify(item));
        }
    }

    async logout():Promise<Boolean>{
        if(this.user)
        {
            const token = this.jwtToken
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const logoutResponse = await axios.get(`/auth/logout`,config)
            sessionStorage.clear()

            localStorage.removeItem(LocalStorageKeys.User)
            localStorage.removeItem(LocalStorageKeys.JwtToken)
        }
        return true;
    }

}