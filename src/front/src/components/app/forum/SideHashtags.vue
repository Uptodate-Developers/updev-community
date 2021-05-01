<template>
     <div class=" relative mb-72">
        <div class="py-1.5 px-4 bg-blue-500">
            <h2 class=" mb-0 text-gray-50">Hashtags populaires</h2>
        </div>
        <div class="flex flex-wrap space-x-1 space-y-1 px-4 py-2 bg-gray-50"  >
             <button  v-for="hashTag in hashTags" :key="hashTag.tag" @click="onSelectTag(hashTag)" :class="hashTag.selected ? 'bg-blue-500 text-gray-50' : 'bg-gray-200 text-gray-500'" class="px-4 pb-0.5 rounded-2xl text-xs focus:outline-none">#{{hashTag.tag}}</button>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent, ref, onMounted,watch} from "vue"
import {HashTagService} from "../../../services"
import {message} from "ant-design-vue"
import {LocalTags} from "../../../models"
import {EventKeys} from "../../../constants"

export default defineComponent({
  name:"SideHashTags",
  emits:[EventKeys.TagSelected],
  props:{
    tags:{
      type:Object as () => string[],
      default:[]
    },
    tagRemoved:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context){
    const hashTagService = new HashTagService()
    const hashTags = ref<LocalTags[]>([])


    const onLoadTags = async () => {
      const tags = await hashTagService.getTags(true,0,200)
      if(typeof tags == "string")
        message.error(tags)
      else
        hashTags.value = hashTagService.checkSelectedTags(tags,hashTagService.selectedTags)
    }
    onMounted(async () => onLoadTags())


    const onSelectTag = async (hashTag:LocalTags) => {
        const indexOfTag = hashTags.value.indexOf(hashTag)
        hashTag.selected = !hashTag.selected
        hashTags.value[indexOfTag] = hashTag
      const selectedTags = hashTags.value.filter(t => t.selected)
      hashTagService.selectedTags = selectedTags.map(t => t.tag)
      context.emit(EventKeys.TagSelected,hashTagService.selectedTags)

    }

    watch(() => props.tag,() => {
      for(const t of props.tags){
        const hashTag = hashTags.value.find(x => x.tag == t)
        if(hashTags.value.some(s => s.tag == hashTag.tag)){
          const indexOfTag = hashTags.value.indexOf(hashTag)
          hashTag.selected = !hashTag.selected
          hashTags.value[indexOfTag] = hashTag
        }
      else{
        hashTags.value[0] = hashTag
        }
      }
    })

    watch(() => props.tagRemoved,() => hashTags.value = hashTagService.checkSelectedTags(hashTags.value.map(t => t.tag),hashTagService.selectedTags))


    return {hashTags,onSelectTag}
  }
})
</script>