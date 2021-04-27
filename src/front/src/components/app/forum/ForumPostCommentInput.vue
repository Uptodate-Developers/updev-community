<template>
  <form class="grid grid-cols-10 gap-1">
    <a-avatar :src="user.profilePicUrl" :style="{backgroundColor: '#9C9C9C',verticalAlign: 'middle'}" :size="35"><span
        style="line-height: 35px"
        class="block text-sm font-semibold">{{ avatar }}</span>
    </a-avatar>
    <div class=" col-span-8 relative text-gray-400 focus-within:text-gray-400">
            <!--<span class="absolute inset-y-0 left-0 flex items-center pl-2 z-50">
                <button type="submit" class="p-1  focus:outline-none focus:shadow-outline">
                    <svg class=" h-4 fill-current" id="comment" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 17.783 17.5">
                        <path id="Path_96" data-name="Path 96"
                              d="M18.167,19.5,12.791,18a9,9,0,0,1-1.9.162C5.759,18.167,2,14.772,2,10.083A7.654,7.654,0,0,1,4.263,4.506,9.429,9.429,0,0,1,10.892,2c5.133,0,8.892,3.395,8.892,8.083a7.724,7.724,0,0,1-1.617,4.769Zm-5.375-2.3,4.567,1.253V14.61l.081-.121a6.958,6.958,0,0,0,1.536-4.405c0-4.2-3.395-7.275-8.083-7.275A8.571,8.571,0,0,0,4.829,5.072a6.924,6.924,0,0,0-2.021,5.012c0,4.2,3.395,7.275,8.083,7.275A7.992,7.992,0,0,0,12.71,17.2Z"
                              transform="translate(-2 -2)"/>
                    </svg>
                </button>
            </span>-->
      <a-textarea
          v-model:value="comment" placeholder="Votre commentaire..." auto-size/>
    </div>
      <button @click="onSubmitComment" type="button" class=" col-span-1 bg-blue-600 h-8 text-gray-50 flex items-center justify-center px-2 py-1.5 space-x-2">
        <svg class=" fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g id="commentico" transform="translate(0.455 0.455)">
            <g id="background">
              <rect id="Rectangle_48" data-name="Rectangle 48" width="24" height="24"
                    transform="translate(-0.455 -0.455)"
                    fill="none"/>
            </g>
            <g id="comment_x5F_accept" transform="translate(1.443 1.443)">
              <path id="Path_165" data-name="Path 165"
                    d="M19.317,6.329H6.329V7.772H19.317Zm0,2.886H6.329v1.443H19.317Zm2.886,3.86V2H2V22.2H3.742l4.331-4.329H10.7a6.493,6.493,0,1,0,11.5-4.8ZM10.7,16.431H7.472L3.443,20.46V3.443H20.76v8.311a6.487,6.487,0,0,0-7.686.348H6.329v1.443h5.424A6.445,6.445,0,0,0,10.7,16.431Zm6.451,5.687a4.967,4.967,0,1,1,4.966-4.966A4.976,4.976,0,0,1,17.153,22.118Z"
                    transform="translate(-2 -2)"/>
              <path id="Path_166" data-name="Path 166"
                    d="M18,21.886l1.443-1.443,1.443,1.443L23.772,19l1.443,1.443-4.329,4.329Z"
                    transform="translate(-6.455 -6.734)"/>
            </g>
          </g>
        </svg>

        <h3 class="text-current mb-0 font-normal hidden ">Commenter</h3>
      </button>
  </form>
</template>
<script lang="ts">
import {computed, defineComponent, ref} from "vue"
import {User} from "../../../../api/models"
import {PostService} from "../../../services"
import {CreateReplyRequest} from "../../../../api/requests"
import {message} from "ant-design-vue"
import {PostResponse, ReplyResponse} from "../../../../api/responses"

export default defineComponent({
  name: "CommentInput",
  props: {
    user: {
      type: Object as () => User,
      required: true
    },
    post: {
      type: Object as () => PostResponse,
      required: true
    },
    reply: {
      type: Object as () => ReplyResponse,
      required: false
    },
  },
  setup(props) {
    const postService = new PostService()
    const fullName = computed(() => `${props.user?.name} ${props.user?.firstName} ${props.user?.lastName}`)
    const avatar = computed(() => `${props.user?.firstName?.charAt(0)}${props.user?.lastName?.charAt(0)}`)

    const comment = ref("")

    const onSubmitComment = async () => {
      if(comment) {
        const reply = <CreateReplyRequest>{
            body:comment.value,
            userId:props.user.id,
            replyId: props.reply?.id ?? undefined,
            postId:props.post.id
        }

        const replyResp = await postService.createReply(reply)
        if(typeof replyResp == "string"){
          message.error(replyResp)
          return
        }

        comment.value = ""
        message.success("Commentaire enregistré")
      }
    }

    return {fullName, avatar, comment,onSubmitComment}
  }
})
</script>