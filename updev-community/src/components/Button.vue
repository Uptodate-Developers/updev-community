<template>
    <button class="block text-center text-gray-50 bg-blue-500 px-5 py-2 rounded-lg shadow-sm">
          {{title}}
    </button>
</template>

<script>
export default{
    name:"Button",
    props:{
        title:String
    }
}
</script>
