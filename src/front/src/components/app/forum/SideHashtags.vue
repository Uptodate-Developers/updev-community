<template>
     <div class=" relative mb-72">
        <div class="py-1.5 px-4 bg-blue-500">
            <h2 class=" mb-0 text-gray-50">Hashtags populaires</h2>
        </div>
        <div class="flex flex-wrap space-x-1 space-y-1 px-4 py-2 bg-gray-50"  >
             <button v-for="tag in hashTags" :key="tag" class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#{{tag}}</button>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent,ref,onMounted} from "vue"
import {HashTagService} from "../../../services/HashTagService"

export default defineComponent({
  name:"SideHashTags",
  setup(){
    const hashTagService = new HashTagService()
    const hashTags = ref<string[]>([])
    onMounted(async () => hashTags.value = await hashTagService.getTags(true,0,100))

    return {hashTags}
  }
})
</script>