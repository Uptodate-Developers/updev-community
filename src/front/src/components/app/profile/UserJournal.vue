<template>
     <div class=" bg-gray-50">
    <a-tabs  default-active-key="1">
      <a-tab-pane  key="1" tab="Posts">
        <div  class=" bg-gray-200 space-y-1 -mt-4 px-1 py-1">
          <forum-post v-if="posts.length" v-for="post in posts" :user="user" :key="post.id" :post="post"/>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Réponses" force-render>
         <div  class=" bg-gray-200 space-y-1 -mt-4 px-1 py-1">
           <forum-response v-for="reply in replies" :key="reply.id" :reply="reply" :user="user"/>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import ForumPost from '../forum/ForumPost.vue'
import ForumResponse from '../forum/ForumResponse.vue'
import {defineComponent,ref,onMounted} from "vue"
import {User} from "../../../../api/models/User"
import {PostService} from "../../../services/PostService"
import {Post} from "../../../../api/models/Post"
import {Reply} from "../../../../api/models/Reply"
import {message} from "ant-design-vue";

export default defineComponent({
  name:"UserJournal",
  components:{ForumPost, ForumResponse},
  props:{
    user:{
      type:Object as () => User,
      required: true
    }
  },
  setup(props){

    const postService = new PostService()
    const skip = ref(0)
    const take = ref(30)
    const isRecent = ref(true)
    const isPopular = ref(false)
    const isLoading = ref(false)
    const posts = ref<Post[]>([])
    const onPosts = async () => await postService.getPostsForUser(props.user.id,skip.value,take.value,isRecent.value,isPopular.value)
    onMounted(async () => posts.value = await onPosts())

    const replies = ref<Reply[]>([])
    const getReplies = async () => {
      isLoading.value = true
      const repliesResponse = await postService.getReplies(undefined,undefined, props.user.id,skip.value,take.value)
      if(typeof repliesResponse == "string"){
        message.error(repliesResponse)
        isLoading.value = false
        return []
      }

      isLoading.value = false
      return repliesResponse
    }
    const onGetReplies = async () => {
      replies.value = []
      replies.value.push(...await getReplies())
    }

    onMounted(async () => await onGetReplies())

    return {posts, replies}
  }
})


</script>

