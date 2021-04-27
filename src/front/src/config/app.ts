import { env } from '../utils/env'

export const appConfig = {
    apiBaseUrl:env('VITE_APP_API_URL'),
    apiUrl:`${env('VITE_APP_API_URL')}api`,
    appUrl:env('VITE_APP_URL')
}