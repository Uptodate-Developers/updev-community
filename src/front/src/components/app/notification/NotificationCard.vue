<template>
    <div class=" bg-gray-50 px-2 py-1 flex items-center justify-between space-x-1">
        <a-avatar   :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="40"><span style="line-height: 40px" class="block text-lg font-semibold">JM</span></a-avatar>
        
         <div>
             <h2>Jullius Nyere <span class=" text-gray-500">a posté sur le forum</span></h2>
             <h3 class=" text-xs">Comment résoudre l'erreur InvalidOperationException en Java?</h3>
         </div>
         <div class=" flex flex-col justify-center items-end space-y-2">
             <span class="mb-0 text-sm text-gray-400">11h45</span>
             <div v-if="isNew"  class="rounded-md h-2 w-2 bg-yellow-300"></div>
         </div>
    </div>
</template>
<script>
export default{
    name:"NotificationCard",
    props:{
        isNew:Boolean
    }
}
</script>
