<template>
    <home-section />
    <about-section />
    <features-section />
    <contributions-section />
</template>

<script>
    import HomeSection from "../components/landingPage/Home.vue"
    import AboutSection from "../components/landingPage/About.vue"
    import FeaturesSection from "../components/landingPage/Features.vue"
    import ContributionsSection from "../components/landingPage/Contribution.vue"
    export default {
        name: 'LandingPageHome',
        components: {
            HomeSection, AboutSection, FeaturesSection,
            ContributionsSection
        }
    }
</script>