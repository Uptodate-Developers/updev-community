import axios from 'axios';
import {appConfig} from "../config/app";
import {AuthService} from "./AuthService";
const auth = new AuthService();
axios.defaults.baseURL = appConfig.apiUrl
axios.defaults.headers.common = {'Authorization': `Bearer ${auth.jwtToken}`}
export default axios