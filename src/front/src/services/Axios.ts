import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { makeAxios } from "@vue-composable/axios";
import { appConfig } from "../config/app";
import { AuthService } from "./AuthService";

const auth = new AuthService();

const config: AxiosRequestConfig = {
  baseURL: appConfig.apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common = { Authorization: `Bearer ${auth.jwtToken}` };

const apiClient: AxiosInstance = axios.create(config);

// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function useAxios() {
  return makeAxios(apiClient);
}

export default apiClient;
