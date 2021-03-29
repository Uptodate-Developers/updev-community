<template>
     <div class=" relative mb-72">
        <div class="py-1.5 px-4 bg-blue-500">
            <h2 class=" mb-0 text-gray-50">Hashtags populaires</h2>
        </div>
        <div class="flex flex-wrap space-x-1 space-y-1 px-4 py-2 bg-gray-50"  >
             <button v-for="item in [...Array(4).keys()]" :key="item" class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#java</button>
              <button v-for="item in [...Array(4).keys()]" :key="item" class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#microservices</button>
               <button v-for="item in [...Array(4).keys()]" :key="item" class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#spring</button>
        </div>
    </div>
</template>