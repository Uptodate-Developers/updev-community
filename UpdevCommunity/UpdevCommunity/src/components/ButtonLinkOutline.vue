<template>
    <router-link :to="link" :v-scroll-to="scrollToLink" class="text-center text-blue-500 px-5 py-2 border-2 border-blue-500 rounded-lg shadow-sm flex justify-center items-center hover:bg-blue-500 hover:text-gray-50">
        {{title}}
    </router-link>
</template>

<script>
export default{
    name:"ButtonLinkOutline",
    props:{
        title: String,
        link: String,
        scrollToLink: String
    }
}
</script>