<template>
    <div :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      class="transform bg-gray-50 flex flex-col shadow h-full w-3/4 py-2 fixed top-18 right-0  overflow-auto ease-in-out transition-all duration-300 z-30 md:hidden">
        <ul class=" space-y-4"  @click="onLinkClicked($event)">
            <li v-for="menu in menus" :key="menu.title"><nav-link   :class="'px-4 py-2'"   :text="menu.title" :link="menu.link" :scrollToLink="menu.scrollToLink"/></li>
        </ul>
        <div class="flex flex-col space-y-4 px-4 mt-3">
            <ul class=" space-y-3" @click="onLinkClicked($event)">
                <li><primary-outline-link-btn  title="Se connecter" link="/login" scrollToLink="#start" /></li>
                <li><primary-btn-link  title="Créer un compte" link="/login" scrollToLink="#start" /></li>
            </ul>
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
    emits:['link-clicked'],
     methods:{
        onLinkClicked(e) {
            if (e.target.localName !== 'a') return;
            this.$emit("link-clicked");
            console.log("Nav-link clicked");
        }
    }
}
</script>