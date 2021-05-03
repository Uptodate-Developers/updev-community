<template>
    <div class=" rounded-md bg-gray-50 px-4 py-2">
        <img class=" mx-auto" src="../../assets/icons/notconnected.svg" alt="Not connected icon"/>
        <h2 class=" mt-3 text-center text-gray-800">Vous n'êtes pas connecté</h2>
        <p class=" text-center text-gray-500">Pour exploiter au maximum le potentiel de ce forum , veuillez
            <router-link class=" text-blue-500 font-semibold" to="/login">vous connectez.</router-link>
        </p>
        <p class=" text-center text-gray-500">ou</p>
        <primary-btn-link class=" mx-8" title="Créer un compte" link="/login" scrollToLink="#start" />
    </div>
</template>
<script>
import PrimaryBtnLink from '../ButtonLink.vue';

export default{
    name:"NotConnected",
    components:{PrimaryBtnLink}
}
</script>
