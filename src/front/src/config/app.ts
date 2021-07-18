import { env } from "../utils/env";

export const appConfig = {
  apiBaseUrl: env("VITE_APP_API_URL"),
  apiUrl: `${env("VITE_APP_API_URL")}api`,
  appUrl: env("VITE_APP_URL"),
  socketUrl: env("VITE_APP_SOCKET_URL")
};

export const socialAuth = {
  google: {
    appId: env("VITE_GOOGLE_APP_ID"),
    appSecret: env("VITE_GOOGLE_APP_SECRET"),
    callbackUrl: env("VITE_GOOGLE_APP_CALLBACK_URL")
  },
  facebook: {
    appId: env("VITE_FACEBOOK_APP_ID"),
    appSecret: env("VITE_FACEBOOK_APP_SECRET"),
    callbackUrl: env("VITE_FACEBOOK_APP_CALLBACK_URL")
  },
  twitter: {
    appId: env("VITE_TWITTER_APP_ID"),
    appSecret: env("VITE_TWITTER_APP_SECRET"),
    callbackUrl: env("VITE_TWITTER_APP_CALLBACK_URL")
  }
};
