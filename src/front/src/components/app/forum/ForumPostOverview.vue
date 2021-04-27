<template>
    <div class="px-4 py-2 bg-gray-50">
        <h1 class=" text-gray-800">{{post.title}}</h1>
        <div class=" text-gray-500" v-html="post.body.substring(0,250)"></div>
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
    import dayjs from "dayjs"
    import utc from "dayjs/plugin/utc"

    dayjs.extend(utc)

    export default defineComponent({
      name:"ForumPostOverview",
      components:{HorizontalLine},
      props:{
        post:{
          type:Object as () => PostResponse,
          required: true
        }
      },
      setup(props){

        const fullName = computed(() => `${props.post.user?.name} ${props.post.user?.firstName} ${props.post.user?.lastName}`)
        const avatar = computed(()=> `${props.post.user?.firstName?.charAt(0)}${props.post.user?.lastName?.charAt(0)}`)
        const fullDate = computed(() => `${dayjs(props.post.datePosted).local().format("DD MMMM YYYY")} à ${dayjs(props.post.datePosted).local().format("HH:mm")}`)


        return {fullName,avatar,fullDate}
      }
    })

</script>
