<template>
    <div id="start" class="pt-14 md:flex md:container mx-auto xl:px-12">
        <div class="container flex flex-col justify-center">
            <div class="py-5 px-4">
            <h1 class=" text-lg font-medium">Bienvenu sur UpdevCommunity</h1>
            <h2 class="text-md font-medium text-gray-400">Veuillez vous identifiez pour accéder au forum</h2>
        </div>
        <div class="flex flex-col  px-4 space-y-2 mb-5">
            <button-icon class=" max-w-lg" v-for="btn in buttons" :key="btn.title" :title="btn.title" :img="btn.btnImg"/>
        </div>
        </div>
        
        <div class=" w-full h-64 md:h-screen/1.8 overflow-hidden relative">
            <img class=" absolute inset-0 w-full h-full object-cover" src="../assets/imgs/login-banner.svg" alt="Login image banner"/>
            <div class=" absolute inset-0 bg-gray-900 bg-opacity-75"/>
            <div class="flex justify-center items-center h-full  relative">
                <h2 class=" text-center font-normal px-2 text-2xl text-green-50 tracking-wider">Communauté des développeurs pour les développeurs et par les développeurs.</h2>
            </div>
        </div>
    </div>
</template>
<script>
    import ButtonIcon from "../components/ButtonIcon.vue"
    import googleImg from '../assets/icons/google.svg'
    import twitterImg from '../assets/icons/twitter.svg'
    import fbImg from '../assets/icons/facebook.svg'
    import githubImg from '../assets/icons/githubblack.svg'

    export default{
        name:"Login",
        components:{ ButtonIcon},
        data() {
    return {
       buttons:[
            {title:"Se connecter avec Google", btnImg:googleImg},
            {title:"Se connecter avec Facebook", btnImg:fbImg},
            {title:"Se connecter avec Twitter", btnImg:twitterImg},
            {title:"Se connecter avec Github", btnImg:githubImg}
      ]
    };
    }
    }
</script>