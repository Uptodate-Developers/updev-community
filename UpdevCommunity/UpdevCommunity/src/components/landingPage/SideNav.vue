<template>
    <div :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      class="transform bg-gray-50 flex flex-col shadow h-full w-1/2 py-2 fixed top-18 right-0  overflow-auto ease-in-out transition-all duration-300 z-30 md:hidden">

        <nav-link :class="'px-4 py-2'" v-for="menu in menus" :key="menu.title" :text="menu.title" :link="menu.link"/>
     
      <div class="flex flex-col space-y-4 px-4 mt-3">
            <primary-outline-btn title="Se connecter"/>
            <primary-btn title="Créer un compte"/>
      </div>
    </div>
</template>
<script>
import NavLink from './NavLink.vue';
import PrimaryBtn from '../Button.vue';
import PrimaryOutlineBtn from '../ButtonOutline.vue';

export default{
    name:"SideNav",
    components: { NavLink, PrimaryOutlineBtn, PrimaryBtn},
    props:{
        isOpen:Boolean,
        menus:Object
    },
}
</script>