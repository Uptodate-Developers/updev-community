<template>
 <navbar :toggleSideNav="triggerSideNav" />
<div @click="closeSideNav">
    <slot />
    <footer-section />
</div>
</template>
<script>
    import Navbar from "../components/landingPage/Navbar.vue"
    import FooterSection from "../components/Footer.vue"
    export default {
        name: 'MainLayout',
        components: {
            Navbar, FooterSection
        },
        data(){
            return{
                triggerSideNav: 0,
            };
        },
        methods:{
             closeSideNav(){
                this.triggerSideNav++;
            }
        }
    }
</script>