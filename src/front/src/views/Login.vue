<template>
    <div id="start" class="pt-14 md:flex md:container mx-auto xl:px-12">
        <div class="container flex flex-col justify-center">
            <div class="py-5 px-4">
            <h1 class=" text-lg font-medium">Bienvenu sur Updev Community</h1>
            <h2 class="text-md font-medium text-gray-400">Veuillez vous identifiez pour accéder au forum</h2>
        </div>
        <div class="flex flex-col  px-4 space-y-2 mb-5">
            <button-icon @click="onFacebookLogin" class=" max-w-lg"  title="Se connecter avec Facebook" :img="fbImage"/>
          <button-icon @click="onGoogleLogin" class=" max-w-lg"  title="Se connecter avec Google" :img="googleImage"/>
          <button-icon @click="onTwitterLogin" class=" max-w-lg"  title="Se connecter avec Twitter" :img="twitterImage"/>
          <button-icon @click="onGithubLogin" class=" max-w-lg"  title="Se connecter avec Github" :img="githubImage"/>

        </div>
        </div>
        
        <div class=" w-full h-64 md:h-screen/1.8 overflow-hidden relative">
            <img class=" absolute inset-0 w-full h-full object-cover" src="../assets/imgs/login-banner.svg" alt="Login image banner"/>
            <div class=" absolute inset-0 bg-gray-900 bg-opacity-75"/>
            <div class="flex justify-center items-center h-full  relative">
                <h2 class=" text-center font-normal px-2 text-2xl text-green-50 tracking-wider">Communauté de développeurs, pour les développeurs et par les développeurs.</h2>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import ButtonIcon from "../components/ButtonIcon.vue"
import googleImg from '../assets/icons/google.svg'
import twitterImg from '../assets/icons/twitter.svg'
import fbImg from '../assets/icons/facebook.svg'
import githubImg from '../assets/icons/githubblack.svg'
import {defineComponent, onMounted} from "vue"
import {useRouter} from 'vue-router'
import {appConfig} from "../config/app"
import {AuthService, UserService} from "../services"
import {AuthResponse} from "../../api/responses"
import {deserialize} from 'class-transformer'
import {StatusCodes} from "../../api/models"
import {message} from "ant-design-vue"

export default defineComponent({
      name: "Login",
      components: {ButtonIcon},
      data() {
        return {
          fbImage: fbImg,
          googleImage:googleImg,
          twitterImage:twitterImg,
          githubImage:githubImg
        }
      },
      setup() {
        const router = useRouter();
        const userService = new UserService();
        const authService = new AuthService();

        const onFacebookLogin = async () => await getAuthResponse(`${appConfig.apiUrl}/auth/facebook`);

        const onGoogleLogin = async () => await getAuthResponse(`${appConfig.apiUrl}/auth/google`);

        const onTwitterLogin = async () => await getAuthResponse(`${appConfig.apiUrl}/auth/twitter`);

        const onGithubLogin = async () => await getAuthResponse(`${appConfig.apiUrl}/auth/github`);

        async function getAuthResponse(url:string)
        {
          const popupWindow = window.open(url, 'Se connecter à Updev Community');

          popupWindow?.addEventListener('unload', async function(event) {

            await sleep(100);//Wait for window to load

            const authResp = deserialize(AuthResponse,popupWindow.document.body.innerText);

            popupWindow.close();

            const authResult = await saveUser(authResp);

            if(authResult === true)
              navigateToProfile();
            else
              message.error(`L'authentification a echoué, message:${authResult}`);

          });
        }

        async function saveUser(authResponse:AuthResponse):Promise<Boolean|string>
        {

          if(authResponse.status == StatusCodes.Success)
          {
            authService.jwtToken = authResponse.token;
            const regUser = await userService.getUserFromApi(authResponse.user.id.toString(),authResponse.token)

            if(typeof regUser !== "string")
              authService.user = regUser;
            else
              return regUser;
            return  true;
          }

          return authResponse.message;
        }

        function sleep(ms:number) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        const navigateToProfile = () => window.location.href = `${appConfig.appUrl}/app`;

        onMounted(async () => {
              if (authService.isAuthenticated)
                navigateToProfile();
            }
        );

        return {onFacebookLogin, onGoogleLogin, onTwitterLogin,onGithubLogin};
      }
    });
</script>