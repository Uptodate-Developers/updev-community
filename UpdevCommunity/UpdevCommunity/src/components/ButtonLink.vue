<template>
    <router-link :to="link" :v-scroll-to="scrollToLink" class="text-center border-2 border-blue-500 text-gray-50 bg-blue-500 px-5 py-2 rounded-lg shadow-sm flex justify-center items-center outline-none hover:bg-gray-50 hover:text-blue-400 hover:border-blue-400">
        {{title}}
    </router-link>
</template>

<script>
export default{
    name:"ButtonLink",
    props:{
        title: String,
        link: String,
        scrollToLink: String
    }
}
</script>