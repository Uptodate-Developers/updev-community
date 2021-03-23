<template>
    <router-link :to="link" class="block text-center text-gray-50 bg-blue-500 px-5 py-2 rounded-lg shadow-sm">
        {{title}}
    </router-link>
</template>

<script>
export default{
    name:"ButtonLink",
    props:{
        title: String,
        link: String
    }
}
</script>