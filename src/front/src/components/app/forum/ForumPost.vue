<template>
    <div class=" bg-gray-50  py-2 rounded-md space-y-2">
        <div class=" px-2 flex space-x-2">
            <a-avatar :src="post.user.profilePicUrl" :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="50"><span style="line-height: 50px" class="block text-xl font-semibold">{{ avatar }}</span></a-avatar>
            <div>
                <h2 class=" mb-0">{{fullName}}</h2>
                <h3 class="  text-gray-400 font-light">{{fullDate}}</h3>
            </div>
        </div>

        <div class="px-6">
            <h1 class=" text-gray-800">{{post.title}}</h1>
            <div class=" text-gray-500" v-html="post.body.substring(0,200)"></div>
        </div>


        <div v-if="post.photoUrls.length" class=" img-container flex overflow-x-auto space-x-1 px-2">
          <a-image-preview-group >
            <a-image
                v-for="url in post.photoUrls" :key="url" :src="url"
                :alt="url"
                fallback="data:image/png;base64,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"
            />
          </a-image-preview-group>
        </div>

        <div class="px-6 space-x-1">
            <button v-for="tag in post.hashtags" :key="tag"  class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#{{tag}}</button>
        </div>

        <div class="pt-2 px-2 flex flex-col lg:flex-row-reverse lg:justify-between">
            <p class=" text-gray-400 self-end lg:self-stretch"></p>
            <div class="flex justify-around space-x-4 lg:space-x-12">
                <button @click="onVote(voteStatus.Up)" class="focus:outline-none">
                    <div class=" flex items-center space-x-1 text-gray-900  hover:text-blue-400">
                        <svg class=" fill-current h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20.634">
                            <g id="upvoteico" transform="translate(25 -3) rotate(90)">
                                <g id="Group_72" data-name="Group 72">
                                    <path id="Path_162" data-name="Path 162" d="M10.619,7,3,16l7.619,9V19.5H23.634v-7H10.619Zm12.222,6.5v5H9.825v4.2L4.19,16,9.9,9.3v4.2Z" />
                                </g>
                            </g>
                        </svg>

                        <h3 class=" text-current fill-current mb-0 font-normal">{{post.upvote}}</h3>
                    </div>
                </button>
              <button @click="onVote(voteStatus.Down)" class="focus:outline-none">
                <div class=" flex items-center space-x-1 text-gray-900  hover:text-blue-400">
                  <svg class=" fill-current h-4 transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20.634">
                    <g id="upvoteico" transform="translate(25 -3) rotate(90)">
                      <g id="Group_72" data-name="Group 72">
                        <path id="Path_162" data-name="Path 162" d="M10.619,7,3,16l7.619,9V19.5H23.634v-7H10.619Zm12.222,6.5v5H9.825v4.2L4.19,16,9.9,9.3v4.2Z" />
                      </g>
                    </g>
                  </svg>

                  <h3 class=" text-current fill-current mb-0 font-normal">{{post.downvote}}</h3>
                </div>
              </button>
                <button @click="onGetReplies" class="focus:outline-none">
                    <div class=" flex items-center space-x-1  text-gray-900 hover:text-blue-400">
                        <svg class=" h-4 fill-current" id="comment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.783 17.5">
                            <path id="Path_96" data-name="Path 96" d="M18.167,19.5,12.791,18a9,9,0,0,1-1.9.162C5.759,18.167,2,14.772,2,10.083A7.654,7.654,0,0,1,4.263,4.506,9.429,9.429,0,0,1,10.892,2c5.133,0,8.892,3.395,8.892,8.083a7.724,7.724,0,0,1-1.617,4.769Zm-5.375-2.3,4.567,1.253V14.61l.081-.121a6.958,6.958,0,0,0,1.536-4.405c0-4.2-3.395-7.275-8.083-7.275A8.571,8.571,0,0,0,4.829,5.072a6.924,6.924,0,0,0-2.021,5.012c0,4.2,3.395,7.275,8.083,7.275A7.992,7.992,0,0,0,12.71,17.2Z" transform="translate(-2 -2)" />
                        </svg>

                        <h3 class="text-current mb-0 font-normal">{{post.replyCounts}}</h3>
                    </div>
                </button>
                <button class="focus:outline-none ">
                    <div class=" flex items-center space-x-1  text-gray-900 hover:text-blue-400">
                        <svg id="shareico" class=" h-4 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16">
                            <path id="Path_51" data-name="Path 51" d="M1.633,18.993a.73.73,0,0,1-.2,0A.616.616,0,0,1,1,18.378v-.615A11.8,11.8,0,0,1,11.131,6.223V3.615a.614.614,0,0,1,.35-.55.649.649,0,0,1,.663.058l7.6,5.536a.6.6,0,0,1,0,.984l-7.6,5.536a.649.649,0,0,1-.663.058.614.614,0,0,1-.35-.55V12.381a11.873,11.873,0,0,0-7.644,4.564l-1.343,1.8A.64.64,0,0,1,1.633,18.993ZM12.4,4.845V6.765a.622.622,0,0,1-.564.615,10.626,10.626,0,0,0-9.5,8.981l.1-.129A13.184,13.184,0,0,1,11.7,11.064a.645.645,0,0,1,.488.16.607.607,0,0,1,.209.455v1.778l5.909-4.306Z" transform="translate(-0.999 -3)" />
                        </svg>

                        <h3 class=" mb-0 text-current font-normal">partager</h3>
                    </div>
                </button>
            </div>
        </div>

        <div v-if="commentsOpened">
            <horizontal-line v-if="isAuth" />
            <forum-post-comment-input v-if="isAuth" :post="post" :user="user" class="px-1 py-2" />
            <horizontal-line />
        </div>

        <div v-if="commentsOpened">
            <forum-response v-if="replies.length" v-for="reply in replies" :key="reply.id" :post="post" :user="user" :reply="reply" can-respond="true" />
        </div>
    </div>
</template>
<script lang="ts">
    import ForumResponse from './ForumResponse.vue'
    import HorizontalLine from '../HorizontalLine.vue'
    import ForumPostCommentInput from './ForumPostCommentInput.vue'
    import {computed, defineComponent, ref, onMounted} from "vue"
    import dayjs from "dayjs"
    import utc from "dayjs/plugin/utc"
    import {User, VoteStatus} from "../../../../api/models"
    import {PostResponse,ReplyResponse} from "../../../../api/responses"
    import {PostService} from "../../../services"
    import {message} from "ant-design-vue";
    dayjs.extend(utc)

    export default defineComponent({
      name:"ForumPost",
      components: { ForumResponse, HorizontalLine, ForumPostCommentInput },
      props: {
        post:{
          type:Object as () => PostResponse,
          required: true
        },
        user:{
          type:Object as () => User
        }
      },
      setup(props){
        const postService = new PostService()
        const isAuth = ref(props.user !== null && props.user !== undefined)
        const fullName = computed(() => `${props.post.user?.name} ${props.post.user?.firstName} ${props.post.user?.lastName}`)
        const avatar = computed(()=> `${props.post.user?.firstName?.charAt(0)}${props.post.user?.lastName?.charAt(0)}`)
        const fullDate = computed(() => `${dayjs(props.post.datePosted).local().format("DD MMMM YYYY")} à ${dayjs(props.post.datePosted).local().format("HH:mm")}`)
        const isLoading = ref(false)
        const voteStatus = ref(VoteStatus)

        const commentsOpened = ref(false)

        const skip = ref(0)
        const take = ref(20)
        const replies = ref<ReplyResponse[]>([])
        const getReplies = async () => {
          isLoading.value = true
          const repliesResponse = await postService.getReplies(props.post.id,undefined,undefined,skip.value,take.value)
          if(typeof repliesResponse == "string"){
            isLoading.value = false
            return []
          }

          isLoading.value = false
          return repliesResponse
        }

        const onGetReplies = async () => {
          commentsOpened.value = !commentsOpened.value
          if(commentsOpened.value){
            replies.value = []
            replies.value.push(...await getReplies())
          }
        }

        const onVote = async (status:VoteStatus) => {
          if(!props.user)
            message.info("Vous devez vous connecter pour placer votre vote")
          else {
            const post = await postService.vote(props.post.id.toString(), undefined, props.user.id.toString(), status)
            if(typeof post !== "string"){
              props.post.downvote = post.downvote
              props.post.upvote = post.upvote
            }
            else{
              message.error(post)
            }
          }
        }

        return {fullName, avatar,voteStatus, fullDate,commentsOpened,isAuth,replies,onGetReplies,onVote}
      }
    })
</script>
<style>
.img-container::-webkit-scrollbar {
    display: none;
}
.ant-image-preview-img-wrapper{
  display: flex;
  align-items: center;
  justify-items: center;
}
.ant-image-img{
  height: 208px;
  width: 100%;
  min-width: 300px;
  object-fit: contain;
  max-width: none;
}
.ant-image{
  height: 208px;
  width: 100% !important;
}
</style>
