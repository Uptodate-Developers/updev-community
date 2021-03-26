<template>
    <router-link  :to="link" v-scroll-to="scrollToLink" class="text-md text-gray-500 font-normal">
        {{title}}
    </router-link>
</template>
<script>
export default{
    name:"NavLink",
    props:{
        title:String,
        link: String,
        scrollToLink: String
    },
    emits:['link-clicked'],
    methods:{
        closeSideNav() {
            this.$emit("link-clicked");
            console.log("LInk clicked");
        },
    }
   
}
</script>
