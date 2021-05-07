<template>
  <div class=" relative mb-72">
    <div class="py-1.5 px-4 bg-blue-500">
      <h2 class=" mb-0 text-gray-50">{{sectionTitle}}</h2>
    </div>
    <div>
      <forum-post-overview v-if="popularPosts.length" v-for="post in popularPosts" :key="post.id" :post="post"/>
    </div>

  </div>
</template>
<script lang="ts">
import ForumPostOverview from './forum/ForumPostOverview.vue'
import { defineComponent,ref,onMounted,watch } from "vue"
import {PostService} from "../../services/PostService"
import {User} from "../../../api/models"
import {message} from "ant-design-vue";
import {PostResponse} from "../../../api/responses"

export default defineComponent({
  name: "PopularTopics",
  components: {ForumPostOverview},
  props:{
    user:{
      type:Object as () => User,
      required: false
    },
    isForUserOnly:{
      type:Boolean,
      default:false,
      required:false
    },
    sectionTitle:{
      type:String,
      default:"Topics populaires"
    },
    tags:{
      type:Object as () => string[],
      default:[]
    },
    exceptPost:{
      type:Object as () => PostResponse,
      default:null
    }
  },
  setup(props){
    const postService = new PostService()
    const popularPosts = ref<PostResponse[]>([])
    const skip = ref(0)
    const take = ref(5)

    const onLoadPosts=  async () => {
      let postResponse = null
      if(props.isForUserOnly)
        postResponse =  await postService.getPostsForUser(Number(props.user?.id),skip.value,take.value,false,true)
      else
        postResponse = await postService.getPosts(skip.value,take.value,false,true)

      if(typeof postResponse == "string"){
        message.error(postResponse)
        return []
      }
      else
        return postResponse
    }
    onMounted(async () => popularPosts.value = await onLoadPosts())

    watch(() => props.tags, async () => {
      const response = await postService.getPostsForTags(props.tags,true,0,6)
      if(typeof response == "string")
        message.error(response)
      else {
        const posts = response.filter(p => p.id !== props.exceptPost.id)
        if(posts.length > 0){
          popularPosts.value = posts
        }
      }
    })

    watch(() => props.user, async () => popularPosts.value = await onLoadPosts())

    return{popularPosts}
  }
})
</script>
