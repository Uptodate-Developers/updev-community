<template>
    <div @click="onNavigateToPostDetail" class="px-4 py-2 bg-gray-50 cursor-pointer">
        <h1 class=" text-gray-800">{{post.title}}</h1>
        <EditorReadOnly :content="post.body.substring(0,300)" />
      <div class="py-2 space-x-1">
        <button  v-for="tag in post.hashtags" :key="tag"  class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500 focus:outline-none">#{{tag}}</button>
      </div>
        <div class=" flex justify-between items-center">
            <a-avatar :src="post.user.profilePicUrl" :style="{backgroundColor: '#9C9C9C',verticalAlign: 'middle'}" :size="35"><span style="line-height: 35px" class="block text-sm font-semibold">{{avatar}}</span></a-avatar>
            <div class=" flex space-x-4">
                <div class=" flex items-center space-x-1">
                    <img src="../../../assets/icons/upvoteTopic.svg" alt="Upvote" />
                    <h3 class=" mb-0 font-normal">{{post.upvote}}</h3>
                </div>
              <div class=" flex items-center space-x-1">
                <img class="transform rotate-180" src="../../../assets/icons/upvoteTopic.svg" alt="Upvote" />
                <h3 class=" mb-0 font-normal">{{post.downvote}}</h3>
              </div>
                <div class=" flex items-center space-x-1">
                    <img src="../../../assets/icons/comment.svg" alt="Comment" />
                    <h3 class=" mb-0 font-normal">{{post.replyCounts}}</h3>
                </div>
            </div>
        </div>
        <horizontal-line class="mt-2" />
    </div>
</template>
<script lang="ts">
    import HorizontalLine from '../HorizontalLine.vue'
    import {computed, defineComponent} from "vue"
    import {PostResponse} from "../../../../api/responses"
    import EditorReadOnly from "../EditorReadOnly.vue"
    import dayjs from "dayjs"
    import {useRouter} from "vue-router"
    import utc from "dayjs/plugin/utc"

    dayjs.extend(utc)

    export default defineComponent({
      name:"ForumPostOverview",
      components:{EditorReadOnly,HorizontalLine},
      props:{
        post:{
          type:Object as () => PostResponse,
          required: true
        }
      },
      setup(props){

        const router = useRouter()
        const fullName = computed(() => `${props.post.user?.name} ${props.post.user?.firstName} ${props.post.user?.lastName}`)
        const avatar = computed(()=> `${props.post.user?.firstName?.charAt(0)}${props.post.user?.lastName?.charAt(0)}`)
        const fullDate = computed(() => `${dayjs(props.post.datePosted).local().format("DD MMMM YYYY")} à ${dayjs(props.post.datePosted).local().format("HH:mm")}`)

        const onNavigateToPostDetail = () => router.push(`/app/post/${props.post.id}`)

        return {fullName,avatar,fullDate,onNavigateToPostDetail}
      }
    })

</script>
