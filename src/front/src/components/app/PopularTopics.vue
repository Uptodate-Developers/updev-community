<template>
  <div class=" relative mb-72">
    <div class="py-1.5 px-4 bg-blue-500">
      <h2 class=" mb-0 text-gray-50">Topics populaires</h2>
    </div>
    <div>
      <forum-post-overview v-if="popularPosts.length" v-for="post in popularPosts" :key="post.id" :post="post"/>
    </div>

  </div>
</template>
<script lang="ts">
import ForumPostOverview from './forum/ForumPostOverview.vue'
import { defineComponent,ref,onMounted } from "vue"
import {PostService} from "../../services/PostService"
import {Post} from "../../../api/models/Post"
import {User} from "../../../api/models/User"

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
    }
  },
  setup(props){
    const postService = new PostService()
    const popularPosts = ref<Post[]>([])
    const skip = ref(0)
    const take = ref(5)

    const onLoadPosts =  () => {
      if(props.isForUserOnly)
        return postService.getPostsForUser(props.user.id,skip.value,take.value,false,true)
      return postService.getPosts(skip.value,take.value,false,true)
    }
    onMounted(async () => popularPosts.value = await onLoadPosts())




    return{popularPosts}
  }
})
</script>
