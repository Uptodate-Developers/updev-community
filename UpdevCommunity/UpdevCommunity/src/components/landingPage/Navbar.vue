<template>
  <header class="fixed left-0 right-0 bg-gray-50 z-30">
    <div class="shadow">
      <div class="md:container mx-auto   flex justify-between items-center px-2 py-2 md:py-4">
      <div class="flex justify-center items-center">
        <h2 class="font-normal text-lg mt-2">UpdevCommunity</h2>
      </div>
      <div class="md:hidden">
        <button @click="isOpen = true" :class="isOpen ? 'hidden' : 'block'" class="focus:outline-none">
          <img src="../../assets/icons/humburger.svg" alt="Open Menu"/>
        </button>
        <button @click="isOpen = false" :class="isOpen ? 'block' : 'hidden'" class="focus:outline-none">
          <img src="../../assets/icons/close.svg" alt="Close Menu"/>
        </button>
      </div>
      <div class="hidden md:block space-x-4" >
           <nav-link v-for="menu in menus" :key="menu.title" :text="menu.title" :link="menu.link"/>
      </div>

      <div class="hidden lg:flex space-x-2">
           <primary-outline-btn title="Se connecter"/>
           <primary-btn title="Créer un compte"/>
      </div>
      </div>

    </div>

    <side-nav :menus="menus" :isOpen="isOpen" />

  </header>
</template>
<script>
import NavLink from './NavLink.vue';
import PrimaryBtn from '../Button.vue';
import PrimaryOutlineBtn from '../ButtonOutline.vue';
import SideNav from './SideNav.vue';

export default {
  components: { NavLink, PrimaryBtn, PrimaryOutlineBtn,SideNav },
  data() {
    return {
      isOpen: false,
      menus:[
        {title:"Acceuil",link:"#home"},
        {title:"Qui sommes nous?",link:"#about"},
        {title:"Fonctionalités",link:"#features"},
        {title:"Contribuer",link:"#contribute"},
        {title:"Forum",link:""},
      ]
    };
  },
};
</script>
