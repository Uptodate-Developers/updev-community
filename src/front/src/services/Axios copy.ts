import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { makeAxios } from "@vue-composable/axios";
import { appConfig } from "../config/app";
import { AuthService } from "./AuthService";

const auth = new AuthService();

const config: AxiosRequestConfig = {
  baseURL: appConfig.apiUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const apiClient: AxiosInstance = axios.create(config);

axios.defaults.headers.common = { Authorization: `Bearer ${auth.jwtToken}` };
// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function useAxios() {
  return makeAxios(apiClient);
}
export default axios;
