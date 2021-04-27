<template>
     <div class=" flex flex-col justify-center bg-gray-50 py-14 px-3 space-y-4 shadow-sm">
               <img class="mx-auto" :src="iconLink" :alt="title" />
               <h2 class="text-center text-lg text-gray-800 font-medium">{{title}}</h2>
                 <p class=" text-gray-600 text-md text-center">
                {{description}}
                </p>
    </div>
</template>
<script>
export default{
    name:"AboutCard",
    props:{
        title:String,
        description:String,
        iconLink:String
    }
}
</script>
