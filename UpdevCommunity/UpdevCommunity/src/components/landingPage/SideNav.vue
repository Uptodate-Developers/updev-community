<template>
    <div :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      class="transform bg-gray-50 flex flex-col shadow h-full w-1/2 py-2 fixed top-18 right-0  overflow-auto ease-in-out transition-all duration-300 z-30 md:hidden">

        <nav-link :class="'px-4 py-2'" v-for="menu in menus" :key="menu.title" :text="menu.title" :link="menu.link" :scrollToLink="menu.scrollToLink"/>
     
        <div class="flex flex-col space-y-4 px-4 mt-3">
            <primary-outline-link-btn title="Se connecter" link="/login" />
            <primary-btn-link title="Créer un compte" link="/signup" />
        </div>
    </div>
</template>
<script>

import NavLink from './NavLink.vue';
import PrimaryBtnLink from '../ButtonLink.vue';
import PrimaryOutlineLinkBtn from '../ButtonLinkOutline.vue';


export default{
        name: "SideNav",
        components: { NavLink, PrimaryOutlineLinkBtn, PrimaryBtnLink },
    props:{
        isOpen:Boolean,
        menus:Object
    },
}
</script>