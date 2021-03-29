<template>
<div class=" bg-gray-200">
 <navbar  />
<div  class="topPadding">
    <slot />
    <footer-section />
</div>
</div>
</template>
<script>
    import Navbar from "../components/app/Navbar.vue"
    import FooterSection from "../components/Footer.vue"
    export default {
        name: 'MainLayout',
        components: {
            Navbar, FooterSection
        },
    }
</script>
<style scoped>
.topPadding{
    padding-top: 86px;
}
@media only screen and (min-width: 768px){
    .topPadding{
        padding-top: 56px;
    }
}
</style>