<template>
  <header class="fixed left-0 right-0 bg-gray-50 z-30">
    <div class="shadow">
      <div
        class="
          md:container
          xl:px-12
          mx-auto
          flex
          justify-between
          items-center
          px-2
          py-2
          md:py-4
        "
      >
        <router-link to="/">
          <div class="flex justify-center items-center">
            <img
              class="h-10"
              src="../../assets/updevcommunitylogo.svg"
              alt="Updev Community logo"
            />
          </div>
        </router-link>
        <div class="md:hidden">
          <button
            @click="isOpen = true"
            :class="isOpen ? 'hidden' : 'block'"
            class="focus:outline-none"
          >
            <img src="../../assets/icons/humburger.svg" alt="Open Menu" />
          </button>
          <button
            @click="isOpen = false"
            :class="isOpen ? 'block' : 'hidden'"
            class="focus:outline-none"
          >
            <img src="../../assets/icons/close.svg" alt="Close Menu" />
          </button>
        </div>
        <div class="hidden md:block space-x-4">
          <nav-link
            v-for="menu in menus"
            :key="menu.title"
            :text="menu.title"
            :link="menu.link"
            :scrollToLink="menu.scrollToLink"
          />
        </div>

        <div v-if="user" class="hidden md:flex space-x-2">
          <router-link to="/app/profile">
            <div class="flex space-x-2">
              <div class="flex justify-center">
                <a-avatar
                  :src="user.profilePicUrl"
                  :style="{
                    backgroundColor: '#0068b7',
                    verticalAlign: 'middle',
                  }"
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
            @click.prevent="onLogout"
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

        <div v-else class="hidden lg:flex space-x-2">
          <primary-outline-link-btn title="Se connecter" link="/login" />
          <primary-btn-link title="Créer un compte" link="/login" />
        </div>
      </div>
    </div>

    <side-nav @link-clicked="isOpen = false" :menus="menus" :isOpen="isOpen" />
  </header>
</template>
<script>
import NavLink from "./NavLink.vue";
import PrimaryBtnLink from "../ButtonLink.vue";
import PrimaryOutlineLinkBtn from "../ButtonLinkOutline.vue";
import SideNav from "./SideNav.vue";
import { defineComponent } from "vue";
import { AuthService } from "../../services";
import { appConfig } from "../../config/app";

export default defineComponent({
  components: { NavLink, PrimaryBtnLink, PrimaryOutlineLinkBtn, SideNav },
  props: {
    toggleSideNav: Number,
  },
  data() {
    return {
      isOpen: false,
      menus: [
        { title: "Accueil", link: "/", scrollToLink: "#home" },
        { title: "Qui sommes-nous?", link: "/", scrollToLink: "#about" },
        { title: "Fonctionnalités", link: "/", scrollToLink: "#features" },
        { title: "Contribuer", link: "/", scrollToLink: "#contribute" },
        { title: "Forum", link: "/app" },
      ],
    };
  },
  methods: {
    closeSideNav() {
      this.isOpen = false;
    },
    async onLogout() {
      const authService = new AuthService();
      if (await authService.logout()) {
        window.location.reload();
      }
    },
  },
  watch: {
    toggleSideNav: function (newVal, oldVal) {
      this.closeSideNav();
    },
  },
  computed: {
    user() {
      const authService = new AuthService();
      return authService.user;
    },
    fullName() {
      return this.user?.name;
    },
    avatar() {
      return `${this.user?.firstName?.charAt(0)}${this.user?.lastName?.charAt(
        0
      )}`;
    },
  },
});
</script>
