import { Providers, UniversalSocialauth } from "universal-social-auth";
import { ProderT } from "universal-social-auth/dist/providers";
import { appConfig, socialAuth } from "./../config/app";
import axios, { AxiosInstance } from "axios";
import { reactive, toRefs } from "vue";
import { message } from "ant-design-vue";

export type SocialProviders = "google" | "facebook" | "twitter" | "github";

interface AuthResponse {
  code: string;
  provider: string;
  id_token: string;
  state: string;
  user: string | boolean;
}

export interface SocialResponse {
  token?: string;
  status: Nullable<number>;
  uid: string;
}

export interface ManagerSchema {
  isLoading: boolean;
  socialResponse: SocialResponse;
  provider: SocialProviders;
}

const getWindowCenterOptions = (width: number = 640, height: number = 320) => {
  const popupWidth = width;
  const popupHeight = height;
  const windowLeft = window.screenLeft || window.screenX;
  const windowTop = window.screenTop || window.screenY;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2;
  const popupTop = windowTop + windowHeight / 2 - popupHeight / 2;

  return {
    scrollbars: "yes",
    width: popupWidth,
    height: popupHeight,
    top: popupTop,
    left: popupLeft
  };
};

export default function useAuth() {
  const options = {
    providers: {
      google: {
        clientId: socialAuth.google.appId,
        redirectUri: socialAuth.google.callbackUrl
      },
      facebook: {
        clientId: socialAuth.facebook.appId,
        redirectUri: socialAuth.facebook.callbackUrl
      },
      twitter: {
        url: socialAuth.twitter.callbackUrl,
        clientId: socialAuth.twitter.appId,
        redirectUri: socialAuth.twitter.callbackUrl
      }
    }
  };

  const manager = reactive<ManagerSchema>({
    isLoading: false,
    provider: "google",
    socialResponse: {
      token: "",
      uid: "",
      status: null
    }
  });

  // @ts-ignore
  const oauth: UniversalSocialauth & AuthResponse = new UniversalSocialauth(
    axios,
    options
  );

  const requestSocialAuth = (provider: SocialProviders) => {
    let socialProvider = <ProderT>Providers[provider];

    if (socialProvider) {
      manager.isLoading = true;
      manager.provider = provider;

      oauth
        .authenticate(provider, {
          ...socialProvider,
          popupOptions: getWindowCenterOptions(
            provider === "facebook" ? 720 : 480,
            580
          )
        })
        .then(async response => {
          const rsp: { code: string } = <{ code: string }>response;
          if (rsp.code) {
            try {
              const { data: response } = await axios.post(
                `${appConfig.apiUrl}/auth/social/${provider}`,
                rsp
              );
              manager.socialResponse = response;
            } catch (error) {
              console.log("error", error);
              message.error(`L'authentification a echoué`);
            } finally {
              manager.isLoading = false;
            }
          }
        })
        .catch((err: unknown) => {
          manager.isLoading = false;
          console.log(err);
        })
        .finally(() => (manager.isLoading = false));
    }
  };

  const toggleLoading = (value: boolean): void => {
    manager.isLoading = value;
  };

  return {
    toggleLoading,
    requestSocialAuth,
    manager: toRefs(manager)
  };
}
