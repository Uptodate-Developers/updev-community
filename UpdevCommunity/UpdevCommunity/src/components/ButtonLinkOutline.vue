<template>
    <router-link :to="link" class="block text-center text-blue-500 px-5 py-2 border-2 border-blue-500 rounded-lg shadow-sm">
        {{title}}
    </router-link>
</template>

<script>
export default{
    name:"ButtonLinkOutline",
    props:{
        title: String,
        link: String
    }
}
</script>