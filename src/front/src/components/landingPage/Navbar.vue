<template>
    <header class="fixed left-0 right-0 bg-gray-50 z-30">
        <div class="shadow">
            <div class="md:container xl:px-12 mx-auto   flex justify-between items-center px-2 py-2 md:py-4">
              <router-link to="/">
                <div class="flex justify-center items-center">
                  <img class="h-10" src="../../assets/updevcommunitylogo.svg" alt="Updev Community logo" />
                </div>
              </router-link>
                <div class="md:hidden">
                    <button @click="isOpen = true" :class="isOpen ? 'hidden' : 'block'" class="focus:outline-none">
                        <img src="../../assets/icons/humburger.svg" alt="Open Menu" />
                    </button>
                    <button @click="isOpen = false" :class="isOpen ? 'block' : 'hidden'" class="focus:outline-none">
                        <img src="../../assets/icons/close.svg" alt="Close Menu" />
                    </button>
                </div>
                <div class="hidden md:block space-x-4">
                    <nav-link  v-for="menu in menus" :key="menu.title" :text="menu.title" :link="menu.link" :scrollToLink="menu.scrollToLink" />
                </div>

                <div class="hidden lg:flex space-x-2">
                    <primary-outline-link-btn title="Se connecter" link="/login" />
                    <primary-btn-link title="Créer un compte" link="/login" />
                </div>
            </div>

        </div>

        <side-nav @link-clicked="isOpen = false" :menus="menus" :isOpen="isOpen" />

    </header>
</template>
<script>
    import NavLink from './NavLink.vue';
    import PrimaryBtnLink from '../ButtonLink.vue';
    import PrimaryOutlineLinkBtn from '../ButtonLinkOutline.vue';
    import SideNav from './SideNav.vue';

    export default {
        components: { NavLink, PrimaryBtnLink, PrimaryOutlineLinkBtn, SideNav },
        props:{
            toggleSideNav:Number
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
                ]
            };
        },
        methods:{
            closeSideNav(){
                this.isOpen = false;
            }
        },
        watch:{
            toggleSideNav:function(newVal, oldVal) {
                this.closeSideNav()
            }
        }
    };
</script>
