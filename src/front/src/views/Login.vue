<template>
  <div id="start" class="pt-14 md:flex md:container mx-auto xl:px-12">
    <div class="container flex flex-col justify-center">
      <div class="py-5 px-4">
        <h1 class="text-lg font-medium">Bienvenue sur Updev Community</h1>
        <h2 class="text-md font-medium text-gray-400">
          Veuillez vous identifier pour accéder au forum
        </h2>
      </div>
      <div class="flex flex-col px-4 space-y-2 mb-5">
        <button-icon
          @click="requestSocialAuth('facebook')"
          class="max-w-lg"
          :img="fbImage"
          :title="
            isProviderLoading('facebook')
              ? 'Connexion en cours, patientez ...'
              : 'Se connecter avec Facebook'
          "
          :loading="isProviderLoading('facebook')"
        />
        <button-icon
          @click="requestSocialAuth('google')"
          class="max-w-lg"
          :img="googleImage"
          :title="
            isProviderLoading('google')
              ? 'Connexion en cours, patientez ...'
              : 'Se connecter avec Google'
          "
          :loading="isProviderLoading('google')"
        />
        <button-icon
          @click="requestSocialAuth('twitter')"
          class="max-w-lg"
          :img="twitterImage"
          :title="
            isProviderLoading('twitter')
              ? 'Connexion en cours, patientez ...'
              : 'Se connecter avec Twitter'
          "
          :loading="isProviderLoading('twitter')"
        />
        <!-- <button-icon
          @click="requestSocialAuth('github')"
          class="max-w-lg"
          :img="githubImage"
          :title="
            isProviderLoading('github')
              ? 'Connexion en cours, patientez ...'
              : 'Se connecter avec Github'
          "
          :loading="isProviderLoading('github')"
        /> -->
      </div>
    </div>

    <div class="w-full h-64 md:h-screen/1.8 overflow-hidden relative">
      <img
        class="absolute inset-0 w-full h-full object-cover"
        src="../assets/imgs/login-banner.svg"
        alt="Login image banner"
      />
      <div class="absolute inset-0 bg-gray-900 bg-opacity-75" />
      <div class="flex justify-center items-center h-full relative">
        <h2
          class="
            text-center
            font-normal
            px-2
            text-2xl text-green-50
            tracking-wider
          "
        >
          Communauté de développeurs, pour les développeurs et par les
          développeurs.
        </h2>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ButtonIcon from "../components/ButtonIcon.vue";
import googleImage from "../assets/icons/google.svg";
import twitterImage from "../assets/icons/twitter.svg";
import fbImage from "../assets/icons/facebook.svg";
import githubImage from "../assets/icons/githubblack.svg";
import { defineComponent, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { appConfig } from "../config/app";
import { AuthService, UserService } from "../services";
import { AuthResponse } from "../../api/responses";
import { deserialize } from "class-transformer";
import { StatusCodes, User } from "../../api/models";
import { message } from "ant-design-vue";
import useAuth, {
  SocialResponse,
  SocialProviders,
} from "./../composables/auth-composable";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: { ButtonIcon },
  setup() {
    const userService = new UserService();
    const authService = new AuthService();

    const router = useRouter();

    const { requestSocialAuth, toggleLoading, manager } = useAuth();

    const { provider, isLoading, socialResponse } = manager;

    watch(socialResponse, (value) => {
      if (value.token) {
        saveUser(value);
      }
    });

    async function saveUser(socialResponse: SocialResponse): Promise<void> {
      try {
        if (socialResponse.status === StatusCodes.Success) {
          toggleLoading(true);
          authService.jwtToken = socialResponse.token;
          const regUser = await userService.getUserFromApi(
            socialResponse.uid,
            socialResponse.token
          );

          if (regUser && regUser?.id) {
            authService.user = <User>regUser;
            navigateToProfile();
          }
        }
      } catch (error) {
        console.log("error", error);
        message.error(`L'authentification a echoué`);
      } finally {
        toggleLoading(false);
      }
    }

    const isProviderLoading = (prov: SocialProviders) => {
      return isLoading.value === true && provider.value === prov;
    };

    const navigateToProfile = () => router.push({ name: "AppHome" });

    onMounted(async () => {
      if (authService.isAuthenticated) navigateToProfile();
    });

    return {
      fbImage,
      isLoading,
      githubImage,
      googleImage,
      twitterImage,
      requestSocialAuth,
      isProviderLoading,
    };
  },
});
</script>
