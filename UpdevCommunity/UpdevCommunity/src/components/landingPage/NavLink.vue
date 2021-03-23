<template>
    <router-link :to="link" class="text-md text-gray-500 font-normal">{{title}}</router-link>
</template>
<script>
export default{
    name:"NavLink",
    props:{
        title:String,
        link:String
    }
}
</script>
