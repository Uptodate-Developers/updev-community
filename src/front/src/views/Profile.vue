<template>
  <div
    v-if="!isLoading"
    class="hidden container mx-auto md:grid grid-cols-3 gap-1 my-2 xl:px-28"
  >
    <div class="col-span-2 space-y-1">
      <user-vue :user="user" />
      <user-journal :user="user" />
    </div>
    <div>
      <div
        class="
          container
          space-y-1
          md:sticky
          top-16
          h-screen
          z-20
          overflow-y-auto
          hiddescrollbar
        "
      >
        <high-lights :user="user" />
        <popular-topics :user="user" :isForUserOnly="true" />
      </div>
    </div>
  </div>
  <div v-if="!isLoading" class="md:hidden space-y-1">
    <user-vue :user="user" />
    <high-lights :user="user" />
    <user-journal :user="user" />
    <popular-topics :user="user" :isForUserOnly="true" />

    <div class="md:hidden flex flex-col">
      <button
        @click="onLogout"
        class="
          self-stretch
          bg-gray-50
          text-red-500
          px-2
          py-2
          space-x-4
          hover:text-red-500
          focus:outline-none
          flex
          justify-center
          items-center
          border
        "
      >
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="25.2"
          height="25.2"
          viewBox="0 0 25.2 25.2"
        >
          <g id="logout" transform="translate(-2 -2)">
            <g id="exit2" transform="translate(2 2)">
              <path
                id="Path_167"
                d="M12.52,12.08a2.527,2.527,0,0,0,2.52-2.52V4.52a2.52,2.52,0,0,0-5.04,0V9.56A2.527,2.527,0,0,0,12.52,12.08Z"
                transform="translate(0.08 -2)"
              />
              <path
                id="Path_168"
                d="M23.546,5h0a1.721,1.721,0,0,0-1.386-.5,1.938,1.938,0,0,0-1.89,1.89,2.642,2.642,0,0,0,.5,1.386h0a8.562,8.562,0,0,1,2.52,6.174,8.82,8.82,0,0,1-17.64,0A8.461,8.461,0,0,1,8.3,7.776h0A2.023,2.023,0,0,0,8.93,6.39,1.938,1.938,0,0,0,7.04,4.5,2.642,2.642,0,0,0,5.654,5h0A12.6,12.6,0,1,0,23.546,5Z"
                transform="translate(-2 -1.35)"
              />
            </g>
          </g>
        </svg>
        <p class="mb-0">Se deconnecter</p>
      </button>
    </div>
  </div>
  <div
    v-if="isLoading"
    class="container mx-auto flex justify-center items-center py-20"
  >
    <a-spin>En cours de chargement...</a-spin>
  </div>
</template>
<script lang="ts">
import HighLights from "../components/app/profile/HighLights.vue";
import UserVue from "../components/app/profile/User.vue";
import UserJournal from "../components/app/profile/UserJournal.vue";
import PopularTopics from "../components/app/PopularTopics.vue";
import { defineComponent, ref, onMounted, reactive } from "vue";
import { AuthService, UserService } from "../services";
import { appConfig } from "../config/app";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { isBlank } from "../utils/str-utils";

export default defineComponent({
  name: "Profile",
  props: {
    username: {
      type: [Number, String],
      default: 0,
    },
  },
  components: { UserVue, HighLights, UserJournal, PopularTopics },
  setup() {
    const authService = new AuthService();
    const userService = new UserService();
    const router = useRouter();
    const isLoading = ref(true);
    let username = router.currentRoute.value.params.username;
    const user = ref({});
    const isAuthenticated = ref(authService.isAuthenticated);
    const onLogout = async () => {
      if (await authService.logout())
        window.location.href = `${appConfig.appUrl}/app`;
    };
    onMounted(async () => {
      const authUser = authService.user;

      if (isBlank(username) && authUser) {
        username = authUser?.username;
      }
      if (username) {
        const userResponse = await userService.getUserByUsername(
          String(username)
        );
        if (typeof userResponse == "string") message.error(userResponse);
        else {
          user.value = userResponse;
        }
      }
      isLoading.value = false;
    });
    return { isLoading, user, isAuthenticated, onLogout };
  },
});
</script>
<style scoped>
.hiddescrollbar::-webkit-scrollbar {
  display: none;
}
</style>
