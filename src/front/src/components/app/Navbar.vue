<template>
  <nav
    class="
      container
      mx-auto
      xl:px-16
      fixed
      left-0
      right-0
      bg-gray-50
      z-30
      shadow-sm
    "
  >
    <div class="md:hidden grid grid-cols-12 px-2 py-1">
      <router-link class="col-span-2 h-full flex items-center" to="/app">
        <img
          class="h-8"
          src="../../assets/logo.svg"
          alt="UpdevCommunity short logo"
        />
      </router-link>
      <serch-input class="col-span-10 w-full" />
    </div>
    <div class="md:hidden bg-gray-100">
      <horizontal-line />
      <div class="grid grid-cols-3 content-center divide-x divide-gray-200">
        <router-link
          class="
            py-1
            text-gray-600
            hover:text-blue-400
            flex
            justify-center
            items-center
          "
          to="/app"
        >
          <svg
            class="h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30.801 29.122"
          >
            <g id="home" transform="translate(0 -2.616)">
              <g
                id="Group_58"
                data-name="Group 58"
                transform="translate(0 2.616)"
              >
                <g
                  id="Group_55"
                  data-name="Group 55"
                  transform="translate(3.85 15.005)"
                >
                  <path
                    id="Path_151"
                    data-name="Path 151"
                    d="M29.1,40.117H20.117V31.775H14.984v8.342H6V26.642a.642.642,0,1,1,1.283,0V38.834H13.7V30.492h7.7v8.342h6.417V27.283a.642.642,0,0,1,1.283,0Z"
                    transform="translate(-6 -26)"
                  />
                </g>
                <g id="Group_56" data-name="Group 56">
                  <path
                    id="Path_152"
                    data-name="Path 152"
                    d="M30.159,18.263a.64.64,0,0,1-.443-.178L15.4,4.392,1.085,18.085A.642.642,0,0,1,.2,17.158L15.4,2.616,30.6,17.157a.642.642,0,0,1-.443,1.106Z"
                    transform="translate(0 -2.616)"
                  />
                </g>
                <g
                  id="Group_57"
                  data-name="Group 57"
                  transform="translate(19.892 2.171)"
                >
                  <path
                    id="Path_153"
                    data-name="Path 153"
                    d="M36.133,11.775a.642.642,0,0,1-.642-.642V7.283h-3.85a.642.642,0,1,1,0-1.283h5.133v5.133A.642.642,0,0,1,36.133,11.775Z"
                    transform="translate(-31 -6)"
                  />
                </g>
              </g>
            </g>
          </svg>
        </router-link>
        <a-badge :count="unreadNotifications">
          <router-link
            class="
              py-1
              text-gray-600
              hover:text-blue-400
              flex
              justify-center
              items-center
            "
            to="/app/notifications"
          >
            <svg
              class="h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24.2 32.947"
            >
              <g id="notifications" transform="translate(-5.3 -5.1)">
                <g id="Layer_3" transform="translate(5.3 5.1)">
                  <path
                    id="Path_155"
                    data-name="Path 155"
                    d="M29.063,29.057,26.585,26A1.977,1.977,0,0,1,26.2,24.83V18.512a8.849,8.849,0,0,0-6.415-8.5V7.53a2.437,2.437,0,0,0-2.43-2.43,2.469,2.469,0,0,0-2.43,2.43V9.96a8.835,8.835,0,0,0-6.415,8.553V24.83A1.977,1.977,0,0,1,8.119,26L5.64,29.057a1.534,1.534,0,0,0-.34.923V33.82H29.5V29.981A2.709,2.709,0,0,0,29.063,29.057ZM16.331,7.53a.972.972,0,0,1,1.944,0V9.717a6.844,6.844,0,0,0-1.992,0V7.53ZM27.945,32.313H6.661V29.981l2.478-3.061a3.22,3.22,0,0,0,.729-2.09V18.512a7.435,7.435,0,1,1,14.87,0V24.83a3.22,3.22,0,0,0,.729,2.09l2.478,3.061v2.333Z"
                    transform="translate(-5.3 -5.1)"
                  />
                  <path
                    id="Path_156"
                    data-name="Path 156"
                    d="M28,20.8v1.458a5.413,5.413,0,0,1,5.394,5.394h1.458A6.844,6.844,0,0,0,28,20.8Z"
                    transform="translate(-16.969 -13.171)"
                  />
                  <path
                    id="Path_157"
                    data-name="Path 157"
                    d="M25.785,67.227A2.51,2.51,0,0,1,23.258,64.7H21.8a3.985,3.985,0,0,0,7.97,0H28.312A2.51,2.51,0,0,1,25.785,67.227Z"
                    transform="translate(-13.782 -35.737)"
                  />
                </g>
              </g>
            </svg>
          </router-link>
        </a-badge>
        <div v-if="isAuth">
          <router-link to="/app/profile">
            <div class="flex justify-center py-1">
              <a-avatar
                :src="user.profilePicUrl"
                :style="{ backgroundColor: '#0068B7', verticalAlign: 'middle' }"
                :size="32"
                ><span
                  style="line-height: 32px"
                  class="block text-sm font-semibold"
                  >{{ fullName }}</span
                ></a-avatar
              >
            </div>
          </router-link>
        </div>

        <router-link
          v-if="!isAuth"
          class="
            py-2
            text-gray-600
            hover:text-blue-400
            flex
            justify-center
            items-center
          "
          to="/login"
        >
          <svg
            class="h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 39.2 39.2"
          >
            <path
              id="Path_95"
              data-name="Path 95"
              d="M19.6,0a19.6,19.6,0,1,0,9.494,36.735l1.455-1.455h-2.9A17.568,17.568,0,0,1,8.208,33.06L8.4,33l1.57-.433,1.593-.368,1.6-.3.452-.111.436-.184.394-.249.352-.314.295-.36.237-.409.172-.436.092-.459.027-.467-.054-.467-.126-.452-.2-.425-.256-.387-.31-.433-.268-.448-.547-1.1-.486-1.129-.425-1.148-.364-1.175L12.3,20.553l-.234-1.206-.168-1.214-.1-1.221-.031-1.229.038-.769.115-.762.184-.746.26-.724.329-.7.394-.658.459-.62.513-.57.574-.517.616-.459.662-.39.7-.333.724-.256.743-.188.762-.115L19.6,7.84l.769.038.762.115.743.188.723.256.7.333.659.39.616.459.574.517.513.57.459.62.394.658.329.7.26.724.188.746.115.762.034.769-.031,1.229-.1,1.221-.168,1.214-.23,1.206-.3,1.191-.364,1.175-.222.6h2.09l.387-1.252.322-1.29.253-1.309.18-1.325.111-1.328.034-1.332-.034-.854-.115-.85-.184-.835-.26-.815-.325-.789-.394-.762-.456-.72-.524-.678-.574-.632L25.9,8.177l-.674-.521L24.5,7.193,23.742,6.8l-.789-.325-.815-.26L21.3,6.029l-.846-.111L19.6,5.88l-.854.038-.846.111-.838.184-.815.26-.789.325-.758.394-.72.463-.678.521-.635.574-.574.632-.521.678-.459.72-.394.762-.325.789-.26.815-.184.835-.111.85-.038.854.034,1.332.111,1.328.18,1.325.253,1.309.322,1.29.394,1.279.467,1.252.524,1.221.6,1.194.356.6.413.57.13.218.069.245.008.249-.061.249-.123.222-.172.184-.214.134-.245.073-1.681.318-1.669.387-1.65.456-1.229.394A17.634,17.634,0,1,1,37.24,19.6a17.479,17.479,0,0,1-1.328,6.68L37.4,27.765A19.562,19.562,0,0,0,19.6,0Zm9.8,25.48,5.88,5.88H21.56v1.96H35.28L29.4,39.2h2.94l6.86-6.86-6.86-6.86Z"
            />
          </svg>
        </router-link>
      </div>
      <horizontal-line />
    </div>

    <div
      class="
        hidden
        md:flex
        justify-between
        items-center
        container
        mx-auto
        xl:px-12
        py-2
        px-2
      "
    >
      <div>
        <img
          class="h-10"
          src="../../assets/updevcommunitylogo.svg"
          alt="UpdevCommunity Logo"
        />
      </div>
      <div class="flex space-x-10 lg:space-x-20">
        <router-link
          class="
            py-1
            text-gray-600
            hover:text-blue-400
            flex
            justify-center
            items-center
          "
          to="/app"
        >
          <svg
            class="h-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30.801 29.122"
          >
            <g id="home" transform="translate(0 -2.616)">
              <g
                id="Group_58"
                data-name="Group 58"
                transform="translate(0 2.616)"
              >
                <g
                  id="Group_55"
                  data-name="Group 55"
                  transform="translate(3.85 15.005)"
                >
                  <path
                    id="Path_151"
                    data-name="Path 151"
                    d="M29.1,40.117H20.117V31.775H14.984v8.342H6V26.642a.642.642,0,1,1,1.283,0V38.834H13.7V30.492h7.7v8.342h6.417V27.283a.642.642,0,0,1,1.283,0Z"
                    transform="translate(-6 -26)"
                  />
                </g>
                <g id="Group_56" data-name="Group 56">
                  <path
                    id="Path_152"
                    data-name="Path 152"
                    d="M30.159,18.263a.64.64,0,0,1-.443-.178L15.4,4.392,1.085,18.085A.642.642,0,0,1,.2,17.158L15.4,2.616,30.6,17.157a.642.642,0,0,1-.443,1.106Z"
                    transform="translate(0 -2.616)"
                  />
                </g>
                <g
                  id="Group_57"
                  data-name="Group 57"
                  transform="translate(19.892 2.171)"
                >
                  <path
                    id="Path_153"
                    data-name="Path 153"
                    d="M36.133,11.775a.642.642,0,0,1-.642-.642V7.283h-3.85a.642.642,0,1,1,0-1.283h5.133v5.133A.642.642,0,0,1,36.133,11.775Z"
                    transform="translate(-31 -6)"
                  />
                </g>
              </g>
            </g>
          </svg>
        </router-link>
        <a-badge :count="unreadNotifications">
          <router-link
            class="
              py-1
              text-gray-600
              hover:text-blue-400
              flex
              justify-center
              items-center
            "
            to="/app/notifications"
          >
            <svg
              class="h-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24.2 32.947"
            >
              <g id="notifications" transform="translate(-5.3 -5.1)">
                <g id="Layer_3" transform="translate(5.3 5.1)">
                  <path
                    id="Path_155"
                    data-name="Path 155"
                    d="M29.063,29.057,26.585,26A1.977,1.977,0,0,1,26.2,24.83V18.512a8.849,8.849,0,0,0-6.415-8.5V7.53a2.437,2.437,0,0,0-2.43-2.43,2.469,2.469,0,0,0-2.43,2.43V9.96a8.835,8.835,0,0,0-6.415,8.553V24.83A1.977,1.977,0,0,1,8.119,26L5.64,29.057a1.534,1.534,0,0,0-.34.923V33.82H29.5V29.981A2.709,2.709,0,0,0,29.063,29.057ZM16.331,7.53a.972.972,0,0,1,1.944,0V9.717a6.844,6.844,0,0,0-1.992,0V7.53ZM27.945,32.313H6.661V29.981l2.478-3.061a3.22,3.22,0,0,0,.729-2.09V18.512a7.435,7.435,0,1,1,14.87,0V24.83a3.22,3.22,0,0,0,.729,2.09l2.478,3.061v2.333Z"
                    transform="translate(-5.3 -5.1)"
                  />
                  <path
                    id="Path_156"
                    data-name="Path 156"
                    d="M28,20.8v1.458a5.413,5.413,0,0,1,5.394,5.394h1.458A6.844,6.844,0,0,0,28,20.8Z"
                    transform="translate(-16.969 -13.171)"
                  />
                  <path
                    id="Path_157"
                    data-name="Path 157"
                    d="M25.785,67.227A2.51,2.51,0,0,1,23.258,64.7H21.8a3.985,3.985,0,0,0,7.97,0H28.312A2.51,2.51,0,0,1,25.785,67.227Z"
                    transform="translate(-13.782 -35.737)"
                  />
                </g>
              </g>
            </svg>
          </router-link>
        </a-badge>
        <div>
          <serch-input />
        </div>
      </div>
      <div v-if="isAuth" class="flex space-x-2">
        <router-link to="/app/profile">
          <div class="flex space-x-2">
            <div class="flex justify-center">
              <a-avatar
                :src="user.profilePicUrl"
                :style="{ backgroundColor: '#0068b7', verticalAlign: 'middle' }"
                :size="42"
                ><span
                  style="line-height: 42px"
                  class="block text-lg font-semibold"
                  >{{ avatar }}</span
                ></a-avatar
              >
            </div>
            <div class="flex flex-col justify-center">
              <h2 class="my-0 text-gray-800">{{ fullName }}</h2>
              <h3 class="my-0 text-xs text-gray-500">{{ user.email }}</h3>
            </div>
          </div>
        </router-link>
        <button
          @click="onLogout"
          class="
            bg-transparent
            text-blue-500
            hover:text-red-500
            focus:outline-none
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
        </button>
      </div>

      <router-link class="text-gray-900" v-if="!isAuth" to="/login">
        <a-tooltip>
          <template v-if="isAuth" #title
            >Voulez-vous vraiment vous deconnecter?</template
          >
          <div
            class="
              fill-current
              text-current
              flex
              justify-center
              items-center
              space-x-2.5
            "
          >
            <svg
              class="h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 39.2 39.2"
            >
              <path
                id="Path_95"
                data-name="Path 95"
                d="M19.6,0a19.6,19.6,0,1,0,9.494,36.735l1.455-1.455h-2.9A17.568,17.568,0,0,1,8.208,33.06L8.4,33l1.57-.433,1.593-.368,1.6-.3.452-.111.436-.184.394-.249.352-.314.295-.36.237-.409.172-.436.092-.459.027-.467-.054-.467-.126-.452-.2-.425-.256-.387-.31-.433-.268-.448-.547-1.1-.486-1.129-.425-1.148-.364-1.175L12.3,20.553l-.234-1.206-.168-1.214-.1-1.221-.031-1.229.038-.769.115-.762.184-.746.26-.724.329-.7.394-.658.459-.62.513-.57.574-.517.616-.459.662-.39.7-.333.724-.256.743-.188.762-.115L19.6,7.84l.769.038.762.115.743.188.723.256.7.333.659.39.616.459.574.517.513.57.459.62.394.658.329.7.26.724.188.746.115.762.034.769-.031,1.229-.1,1.221-.168,1.214-.23,1.206-.3,1.191-.364,1.175-.222.6h2.09l.387-1.252.322-1.29.253-1.309.18-1.325.111-1.328.034-1.332-.034-.854-.115-.85-.184-.835-.26-.815-.325-.789-.394-.762-.456-.72-.524-.678-.574-.632L25.9,8.177l-.674-.521L24.5,7.193,23.742,6.8l-.789-.325-.815-.26L21.3,6.029l-.846-.111L19.6,5.88l-.854.038-.846.111-.838.184-.815.26-.789.325-.758.394-.72.463-.678.521-.635.574-.574.632-.521.678-.459.72-.394.762-.325.789-.26.815-.184.835-.111.85-.038.854.034,1.332.111,1.328.18,1.325.253,1.309.322,1.29.394,1.279.467,1.252.524,1.221.6,1.194.356.6.413.57.13.218.069.245.008.249-.061.249-.123.222-.172.184-.214.134-.245.073-1.681.318-1.669.387-1.65.456-1.229.394A17.634,17.634,0,1,1,37.24,19.6a17.479,17.479,0,0,1-1.328,6.68L37.4,27.765A19.562,19.562,0,0,0,19.6,0Zm9.8,25.48,5.88,5.88H21.56v1.96H35.28L29.4,39.2h2.94l6.86-6.86-6.86-6.86Z"
              />
            </svg>
            <p class="mb-0 text-md">Se connecter</p>
          </div>
        </a-tooltip>
      </router-link>
    </div>
  </nav>
</template>
<script lang="ts">
import Button from "../Button.vue";
import SerchInput from "./SearchInput.vue";
import HorizontalLine from "./HorizontalLine.vue";
import { defineComponent, computed, onMounted } from "vue";
import { AuthService } from "../../services/AuthService";
import { useRouter } from "vue-router";
import { appConfig } from "../../config/app";
import { useNotificationStore } from "./../../store/notification";

export default defineComponent({
  name: "Navbar",
  components: { SerchInput, Button, HorizontalLine },
  setup() {
    const authService = new AuthService();
    const router = useRouter();
    const notificationStore = useNotificationStore();

    const user = authService.user;
    const isAuth = authService.isAuthenticated;
    const fullName = computed(() => user?.name);
    const avatar = computed(
      () => `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`
    );

    const unreadNotifications = computed(
      () => notificationStore.unreadNotifications
    );

    const onGetNotifications = async () => {
      if (user) {
        await notificationStore.loadNotifications(user.id.toString());
      }
    };

    onMounted(onGetNotifications);

    const onLogout = async () => {
      if (await authService.logout())
        window.location.href = `${appConfig.appUrl}/app`;
    };

    return { user, fullName, avatar, isAuth, unreadNotifications, onLogout };
  },
});
</script>
