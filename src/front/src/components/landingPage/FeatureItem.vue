<template>
      <a  class="flex items-center max-w-md px-4 space-x-5 py-3 hover:bg-gray-100 hover:shadow">
        <img :src="iconLink" :alt="title"/>
        <h3 >{{title}}</h3>
     </a>
</template>
<script>
export default{
    name:"FeatureItem",
    props:{
        title:String,
        iconLink:String
    }
}
</script>
<style scoped>
    .active-feature {
        @apply bg-gray-100 shadow;
    }
</style>