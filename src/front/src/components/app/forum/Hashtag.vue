<template>
    <div :class="canHideTags || tags.length == 0 ? 'hidden': 'block'" class=" bg-gray-50 rounded-md">
        <div class="flex justify-between items-center px-4 py-1">
            <h2 class=" mb-0 text-gray-600">Hashtags</h2>
            <button @click="onRemoveAllTags" class=" text-gray-400 hover:text-blue-400 outline-none focus:outline-none">
                 <svg class=" stroke-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17.651 17.651">
                <g id="closeico" transform="translate(1480.614 33.501)">
                    <path id="path1419" d="M-1479.2-17.264l14.822-14.822" transform="translate(0 -0.001)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    <path id="path1421" d="M-1479.2-32.087l14.822,14.822" transform="translate(0)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </g>
            </svg>
            </button>
        </div>
        <horizontal-line />
        <div class="flex flex-wrap space-x-1 space-y-1 px-4 py-2">
            <closable-hashtag @tagRemoved="onTagRemoved" v-for="item in tags" :title="item" :key="item"/>
        </div>
    </div>
</template>
<script lang="ts">
    import HorizontalLine from '../HorizontalLine.vue'
    import ClosableHashtag from './HashTagClosable.vue'
    import {defineComponent,ref,watch} from "vue"
    import {HashTagService} from "../../../services"
    import {EventKeys} from "../../../constants"

    export default defineComponent({
      name: "HashTag",
      components: { HorizontalLine, ClosableHashtag },
      props:{
        tags:{
          type:Object as () => string[],
          default:[]
        },
        hideTags:{
          type:Boolean,
          default:true
        }
      },
      emits:[EventKeys.TagRemoved,EventKeys.TagSelected],
      setup(props,context){
        const hashTagService = new HashTagService()
        const tags = ref(hashTagService.selectedTags)
        const canHideTags = ref(tags.value.length == 0)

        watch(() => props.tags,() => tags.value = props.tags)
        watch(() => props.hideTags,() => canHideTags.value = props.hideTags)

        const onTagRemoved = (tag:string) => {
          tags.value = tags.value.filter(t => t != tag)
          hashTagService.selectedTags = tags.value
          context.emit(EventKeys.TagSelected,tags.value)
          context.emit(EventKeys.TagRemoved,true)
        }

        const onRemoveAllTags = () => {
          canHideTags.value = true
          hashTagService.selectedTags = []
          context.emit(EventKeys.TagSelected,[])
          context.emit(EventKeys.TagRemoved,true)
        }

        return {tags,canHideTags,onTagRemoved,onRemoveAllTags}
      }
    })
</script>
