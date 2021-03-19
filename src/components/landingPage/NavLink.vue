<template>
     <a :href="link" class="text-md text-gray-500 font-normal">{{title}}</a>
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
