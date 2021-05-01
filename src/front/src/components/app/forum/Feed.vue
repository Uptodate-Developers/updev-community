<template>
<div class=" space-y-1">
     <new-post  v-if="isAuth" :user="user" />
    <not-connected v-if="!isAuth" class="md:hidden" />
    <hash-tags class="md:hidden" :tags="tags" @tagSelected="onTagSelected" @tagRemoved="onTagRemoved" :hide-tags="hideTags" />

  <a-list :data-source="posts" :grid="{ column: 1 }" itemLayout="vertical">
    <template #loadMore>
      <div class="flex justify-center py-2">
        <a-spin v-if="isLoading" />
        <button v-else @click="loadMore" class="text-blue-500 font-semibold focus:outline-none">Charger plus...</button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <forum-post  :post="item"  :user="user" />
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
    import {defineComponent, ref, onMounted,watch} from "vue"
    import {User} from "../../../../api/models"
    import {PostService} from "../../../services"
    import {PostResponse} from "../../../../api/responses"
    import {message} from "ant-design-vue"
    import {EventKeys} from "../../../constants"

    export default defineComponent({
      name: "Feed",
      components: {NewPost, NotConnected, HashTags, ForumPost },
      emits:[EventKeys.TagRemoved],
      props:{
        user: {
          type:Object as () => User
        },
        tags:{
          type:Object as () => string[],
          default:[]
        }
      },
      setup(props,context) {

        const postService = new PostService()
        const isAuth = props.user ? true : false
        const skip = ref(0)
        const take = ref(10)
        const isRecent = ref(true)
        const isPopular = ref(false)
        const isLoading = ref(false)
        const posts = ref<PostResponse[]>([])
        const hideTags = ref(true)
        const onPosts = async (tags:string[]) => {
          isLoading.value = true
          const postsResponse = tags.length ? await postService.getPostsForTags(tags,isPopular.value,skip.value,take.value)
              : await postService.getPosts(skip.value,take.value,isRecent.value,isPopular.value)
          if(typeof postsResponse != "string") {
            isLoading.value = false
            return postsResponse
          }
          else
            message.error(postsResponse)
          isLoading.value = false
          return []
        }

        onMounted(async () => {
          if(props.tags.some(t => typeof t == "string"))
            posts.value = await onPosts(props.tags)
          else
            posts.value = await onPosts([])
        })

        const loadMore = async () => {
          skip.value = skip.value + take.value
          const newPosts = await onPosts(props.tags)
          posts.value.push(...newPosts)
        }

        watch(() => props.tags,async () => {
            skip.value = 0
          const newPosts = await onPosts(props.tags)
          posts.value = []
          posts.value.push(...newPosts)
          hideTags.value = props.tags.length == 0
        })

        const onTagSelected = async (tags:string[]) => {
          skip.value = 0
          const newPosts = await onPosts(tags)
          posts.value = []
          posts.value.push(...newPosts)
          hideTags.value = tags.length == 0
        }

        const onTagRemoved = () => context.emit(EventKeys.TagRemoved)


        return{isAuth,posts,hideTags, loadMore,onTagSelected,onTagRemoved}
      }
    })
</script>
