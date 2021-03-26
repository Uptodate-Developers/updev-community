<template>
    <button class="border-2 border-blue-400 rounded-md px-6 py-2 hover:border-blue-300 outline-none">
        <div class="flex items-center justify-center space-x-4 text-blue-400 hover:text-blue-200">
            <img class=" max-h-8"  :src="img" :alt="title" />
            <p class="mb-0 text-md">{{title}}</p>
        </div>
    </button>
</template>
<script>
export default{
    name:"ButtonIcon",
    props:{
        img:String,
        title: String
    }
}
</script>
