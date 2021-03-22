<template>
    <button class="block text-center text-blue-500 px-5 py-2 border-2 border-blue-500 rounded-lg shadow-sm">
          {{title}}
    </button>
</template>

<script>
export default{
    name:"ButtonOutline",
    props:{
        title:String
    }
}
</script>