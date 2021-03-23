<template>
    <navbar />
    <slot />
    <footer-section />
</template>
<script>
    import Navbar from "../components/landingPage/Navbar.vue"
    import FooterSection from "../components/Footer.vue"
    export default {
        name: 'MainLayout',
        components: {
            Navbar, FooterSection
        }
    }
</script>