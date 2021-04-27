<template>
<div class=" space-y-1">
     <new-post  v-if="isAuth" :user="user" />
    <not-connected v-if="!isAuth" class="md:hidden" />
    <hash-tags class="md:hidden" />

  <a-list :data-source="posts" :grid="{ column: 1 }" itemLayout="vertical">
    <template #loadMore>
      <div class="flex justify-center py-2">
        <a-spin v-if="isLoading" />
        <button v-else @click="loadMore" class="text-blue-500 font-semibold focus:outline-none">Charger plus...</button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <forum-post   :post="item"  :user="user" />
      </a-list-item>
    </template>
  </a-list>

</div>
</template>
<script lang="ts">
    import NewPost from './NewPost.vue'
    import NotConnected from '../NotConnected.vue'
    import HashTags from './Hashtag.vue'
    import ForumPost from './ForumPost.vue'
    import {defineComponent, ref, onMounted} from "vue"
    import {User} from "../../../../api/models"
    import {PostService} from "../../../services"
    import {PostResponse} from "../../../../api/responses"
    import {message} from "ant-design-vue"

    export default defineComponent({
      name: "Feed",
      components: {NewPost, NotConnected, HashTags, ForumPost },
      props:{
        user: {
          type:Object as () => User
        }
      },
      setup({user}) {

        const postService = new PostService()
        const isAuth = user ? true : false
        const skip = ref(0)
        const take = ref(10)
        const isRecent = ref(true)
        const isPopular = ref(false)
        const isLoading = ref(false)

        const posts = ref<PostResponse[]>([])
        const onPosts = async () => {
          isLoading.value = true
          const postsResponse = await postService.getPosts(skip.value,take.value,isRecent.value,isPopular.value)
          if(typeof postsResponse != "string") {
            isLoading.value = false
            return postsResponse
          }
          else
            message.error(postsResponse)
          isLoading.value = false
          return []
        }

        onMounted(async () => posts.value = await onPosts())

        const loadMore = async () => {
          skip.value = skip.value + take.value
          const newPosts = await onPosts()
          posts.value.push(...newPosts)
        }

        return{isAuth,posts, loadMore}
      }
    })
</script>
