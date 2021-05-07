<template>
     <div class=" bg-gray-50">
    <a-tabs  default-active-key="1">
      <a-tab-pane  key="1" tab="Posts">
        <div class="bg-gray-200">
          <a-list  :data-source="posts" :grid="{ column: 1, gutter:0 }" itemLayout="vertical">
            <template #loadMore>
              <div class="flex justify-center py-2">
                <a-spin v-if="isLoading" />
                <button  v-if="!isLoading && canLoadMore" @click="loadMore" class="text-blue-500 font-semibold focus:outline-none">Charger plus...</button>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item>
                <forum-post class="my-2" @postDeleted="onPostDeleted"  :post="item"  :user="user"  />
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Réponses" force-render>
        <div class="mt-5">
          <a-list  :data-source="replies" :grid="{ column: 1 }" itemLayout="vertical">
            <template #loadMore>
              <div class="flex justify-center py-2">
                <a-spin v-if="isLoadingReplies" />
                <button  v-if="!isLoadingReplies && canLoadMoreReplies" @click="loadMoreReplies" class="text-blue-500 font-semibold focus:outline-none">Charger plus...</button>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item>
                <forum-response @replyDeleted="onReplyDeleted"  :reply="item"  :user="user"  />
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import ForumPost from '../forum/ForumPost.vue'
import ForumResponse from '../forum/ForumResponse.vue'
import {defineComponent,ref,onMounted,watch} from "vue"
import {User} from "../../../../api/models/User"
import {PostService} from "../../../services"
import {message} from "ant-design-vue"
import {PostResponse,ReplyResponse} from "../../../../api/responses"

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
    const take = ref(10)
    const isRecent = ref(true)
    const isPopular = ref(false)
    const isLoading = ref(false)
    const canLoadMore = ref(false)
    const posts = ref<PostResponse[]>([])
    const onPosts = async () => {
      isLoading.value = true
      const postResponse = await postService.getPostsForUser(props.user.id,skip.value,take.value,isRecent.value,isPopular.value)
      isLoading.value = false
      if(typeof postResponse == "string") {
        message.error(postResponse)
        return []
      }
      else {
        return postResponse
      }
    }
    const onGetPosts = async () => {
      posts.value = await onPosts()
      canLoadMore.value = posts.value.length >= take.value
    }
    onMounted(async () => onGetPosts())
    const onPostDeleted = (postId:string) => {
      posts.value = posts.value.filter(p => p?.id?.toString() != postId)
    }
    const loadMore = async () => {
      skip.value = skip.value + take.value
      const newPosts = await onPosts()
      posts.value.push(...newPosts)
      canLoadMore.value = posts.value.length >= take.value
    }

    const isLoadingReplies = ref(false)
    const canLoadMoreReplies = ref(false)
    const replies = ref<ReplyResponse[]>([])
    const getReplies = async () => {
      isLoadingReplies.value = true
      const repliesResponse = await postService.getReplies(undefined,undefined, props.user.id,skip.value,take.value)
      if(typeof repliesResponse == "string"){
        message.error(repliesResponse)
        isLoading.value = false
        return []
      }

      isLoadingReplies.value = false
      return repliesResponse
    }
    const onGetReplies = async () => {
      replies.value = []
      replies.value.push(...await getReplies())
      canLoadMoreReplies.value = replies.value.length >= take.value
    }
    onMounted(async () => await onGetReplies())
    const loadMoreReplies = async () => {
      skip.value = skip.value + take.value
      const newReplies = await getReplies()
      replies.value.push(...newReplies)
      canLoadMoreReplies.value = replies.value.length >= take.value
    }
    const onReplyDeleted = (replyId:string) => {
      replies.value = replies.value.filter(p => p.id.toString() != replyId)
    }

    watch(() => props.user, async () => {
      await onGetPosts()
      await onGetReplies()
    })

    return {isLoading,canLoadMore,loadMore,posts,onPostDeleted, isLoadingReplies,replies,canLoadMoreReplies,loadMoreReplies,onReplyDeleted}
  }
})


</script>

