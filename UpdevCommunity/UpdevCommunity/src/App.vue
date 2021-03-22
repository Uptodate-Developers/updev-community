<template>
  <navbar/>
  <home-section/>
  <about-section/>
  <features-section/>
  <contributions-section/>
  <footer-section/>
</template>

<script>
import Navbar from "./components/landingPage/Navbar.vue"
import HomeSection from "./components/landingPage/Home.vue"
import AboutSection from "./components/landingPage/About.vue"
import FeaturesSection from "./components/landingPage/Features.vue"
import ContributionsSection from "./components/landingPage/Contribution.vue"
import FooterSection from "./components/Footer.vue"
export default {
  name: 'App',
  components:{
    Navbar, HomeSection,AboutSection,FeaturesSection,
    ContributionsSection,FooterSection
  }
}
</script>

