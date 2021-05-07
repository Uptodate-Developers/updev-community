<template>
<form  @focusin="onHideSearch(false)"  class="w-full" method="GET">
    <div class="relative text-gray-400 w-full focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <svg  stroke="currentColor"   stroke-linecap="round" stroke-linejoin="round" fill="none"  viewBox="0 0 24 24" class="w-6 h-6 stroke-2 text-gray-400 stroke-gray-400"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
      <input v-model="searchQuery"  style="width: 18rem"  type="search" name="q" class="py-2 h-8 md:h-full text-sm  bg-gray-100 rounded-sm pl-10 focus:outline-none border border-gray-200 focus:border-gray-200  focus:bg-white focus:text-gray-900 lg:w-96 focus:border-0 focus:ring-offset-blue-500" placeholder="Rechercher..." autocomplete="off">
    </div>
  </form>
  <div v-if="posts.length && !hiddeSearch" class="absolute hiddescrollbar w-full h-96 overflow-y-auto z-30 shadow-lg mt-10 right-0.5 left-0.5  md:mx-0 md:mt-4 md:max-w-lg md:left-48 lg:left-80">
    <div class="fixed w-full left-0.5 right-0.5 bg-gray-50 z-50 md:max-w-lg md:left-48 lg:left-80">
      <div  class="flex justify-between items-center px-4 py-1 bg-gray-50">
        <h2 class=" mb-0 text-gray-600">Résultat de la recherche</h2>
        <button @click="onHideSearch(true)" class=" text-gray-400 hover:text-blue-400 outline-none focus:outline-none">
          <svg class=" stroke-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17.651 17.651">
            <g id="closeico" transform="translate(1480.614 33.501)">
              <path id="path1419" d="M-1479.2-17.264l14.822-14.822" transform="translate(0 -0.001)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              <path id="path1421" d="M-1479.2-32.087l14.822,14.822" transform="translate(0)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </g>
          </svg>
        </button>
      </div>
      <horizontal-line />
    </div>
    <forum-post-overview  @click="onHideSearch(true)" v-for="post in posts" :key="post.id" :post="post"/>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watchEffect} from "vue"
import ForumPostOverview from "./forum/ForumPostOverview.vue"
import {PostService} from "../../services"
import {PostResponse} from "../../../api/responses"
import {SearchIn} from "../../../api/models"
import {message} from "ant-design-vue"
import HorizontalLine from "./HorizontalLine.vue"

export default defineComponent({
  name:"Search",
  components:{HorizontalLine,ForumPostOverview},
  setup(){
      const searchQuery = ref("")
    const postService = new PostService()
    const posts = ref<PostResponse[]>([])
    const onSearchPost = async (query:string,searchin:SearchIn) => {
        const response = await postService.search(query,searchin)
        if(typeof response == "string")
          message.error(response)
        else {
          return response
        }
        return []
    }
    const hiddeSearch = ref(true)

    watchEffect(async () => {
      if(searchQuery.value){
        const postsResponse = await onSearchPost(searchQuery.value,SearchIn.Tag)
        if(typeof postsResponse != "string"){
          const allPosts = posts.value
          allPosts.unshift(...postsResponse)
          posts.value = getUniqueListBy(allPosts,"id")
        }
      }else
        posts.value = []
    })
    watchEffect(async () => {
      if(searchQuery.value) {
        const postsResponse = await onSearchPost(searchQuery.value,SearchIn.Body)
        if(typeof postsResponse != "string"){
          const allPosts = posts.value
          allPosts.unshift(...postsResponse)
          posts.value = getUniqueListBy(allPosts,"id")
        }
      }
      else
        posts.value = []
    })
    watchEffect(async () => {
      if(searchQuery.value) {
        const postsResponse = await onSearchPost(searchQuery.value,SearchIn.Title)
        if(typeof postsResponse != "string"){
          const allPosts = posts.value
          allPosts.unshift(...postsResponse)
          posts.value = getUniqueListBy(allPosts,"id")
        }
      }else
        posts.value = []
    })

    function getUniqueListBy(arr:PostResponse[], key:string) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const onHideSearch = (hide:boolean) => {
        hiddeSearch.value = hide
    }

    return {onHideSearch,hiddeSearch,posts,searchQuery}
  }
})
</script>
<style scoped>
.hiddescrollbar::-webkit-scrollbar {
  display: none;
}
</style>
