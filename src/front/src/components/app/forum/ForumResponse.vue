<template>
  <div class="px-2 py-1 pl-4 rouded-md bg-gray-50 space-y-2">
    <div class="flex justify-between items-center">
      <div
        @click="goToProfile"
        class="flex space-x-2 cursor-pointer hover:text-blue-300"
      >
        <a-avatar
          :src="reply.user?.profilePicUrl"
          :style="{ backgroundColor: '#0068B7', verticalAlign: 'middle',width: '40px',height: '40px' }"
          :size="35"
          ><span
            style="line-height: 35px"
            class="block text-lg font-semibold"
            >{{ avatar }}</span
          ></a-avatar
        >
        <div>
          <h2 class="mb-0">{{ fullName }}</h2>
          <h3 class="text-xs text-gray-400 font-light">{{ fullDate }}</h3>
        </div>
      </div>
      <button
        v-if="isOwner"
        @click="showConfirmDeletion"
        class="bg-gray-50 p-2 text-red-500 hover:bg-red-500 hover:text-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
    <div class="flex px-4">
      <div style="width: 1.5px" class="bg-gray-200 h-full"></div>
      <div>
        <div class="text-gray-500 comment-body" v-html="commentBody"></div>
      </div>
    </div>
    <div class="flex space-x-4">
      <button @click="onVote(voteStatus.Up)" class="focus:outline-none">
        <div
          class="flex items-center space-x-1 text-gray-900 hover:text-blue-400"
        >
          <svg
            class="fill-current h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 20.634"
          >
            <g id="upvoteico" transform="translate(25 -3) rotate(90)">
              <g id="Group_72" data-name="Group 72">
                <path
                  id="Path_162"
                  data-name="Path 162"
                  d="M10.619,7,3,16l7.619,9V19.5H23.634v-7H10.619Zm12.222,6.5v5H9.825v4.2L4.19,16,9.9,9.3v4.2Z"
                />
              </g>
            </g>
          </svg>

          <h3 class="text-current fill-current mb-0 font-normal">
            {{ reply.upvote }}
          </h3>
        </div>
      </button>
      <button @click="onVote(voteStatus.Down)" class="focus:outline-none">
        <div
          class="flex items-center space-x-1 text-gray-900 hover:text-blue-400"
        >
          <svg
            class="fill-current h-4 transform rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 20.634"
          >
            <g id="upvoteico" transform="translate(25 -3) rotate(90)">
              <g id="Group_72" data-name="Group 72">
                <path
                  id="Path_162"
                  data-name="Path 162"
                  d="M10.619,7,3,16l7.619,9V19.5H23.634v-7H10.619Zm12.222,6.5v5H9.825v4.2L4.19,16,9.9,9.3v4.2Z"
                />
              </g>
            </g>
          </svg>

          <h3 class="text-current fill-current mb-0 font-normal">
            {{ reply.downvote }}
          </h3>
        </div>
      </button>
      <button
        v-if="canRespond"
        @click="onGetReplies"
        class="focus:outline-none"
      >
        <div
          class="flex items-center space-x-1 text-gray-900 hover:text-blue-400"
        >
          <svg
            class="h-4 fill-current"
            id="comment"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17.783 17.5"
          >
            <path
              id="Path_96"
              data-name="Path 96"
              d="M18.167,19.5,12.791,18a9,9,0,0,1-1.9.162C5.759,18.167,2,14.772,2,10.083A7.654,7.654,0,0,1,4.263,4.506,9.429,9.429,0,0,1,10.892,2c5.133,0,8.892,3.395,8.892,8.083a7.724,7.724,0,0,1-1.617,4.769Zm-5.375-2.3,4.567,1.253V14.61l.081-.121a6.958,6.958,0,0,0,1.536-4.405c0-4.2-3.395-7.275-8.083-7.275A8.571,8.571,0,0,0,4.829,5.072a6.924,6.924,0,0,0-2.021,5.012c0,4.2,3.395,7.275,8.083,7.275A7.992,7.992,0,0,0,12.71,17.2Z"
              transform="translate(-2 -2)"
            />
          </svg>

          <h3 class="text-current mb-0 font-normal">{{ reply.replyCounts }}</h3>
        </div>
      </button>
      <button v-if="canRespond" @click="onRespond" class="focus:outline-none">
        <div
          class="flex items-center space-x-1 text-gray-900 hover:text-blue-400"
        >
          <svg
            class="h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.359 16"
          >
            <g id="respondico" transform="translate(-0.999 -3)">
              <path
                id="Path_51"
                data-name="Path 51"
                d="M19.712,18.993a.758.758,0,0,0,.2,0,.617.617,0,0,0,.445-.615v-.615A11.871,11.871,0,0,0,10.034,6.223V3.615a.613.613,0,0,0-.357-.55A.672.672,0,0,0,9,3.123L1.257,8.659a.6.6,0,0,0,0,.984L9,15.18a.672.672,0,0,0,.676.058.613.613,0,0,0,.357-.55V12.381a12.139,12.139,0,0,1,7.788,4.564l1.368,1.8A.656.656,0,0,0,19.712,18.993ZM8.742,4.845V6.765a.626.626,0,0,0,.574.615A10.742,10.742,0,0,1,19,16.361l-.1-.129a13.5,13.5,0,0,0-9.44-5.167.665.665,0,0,0-.5.16.6.6,0,0,0-.213.455v1.778L2.722,9.151Z"
                transform="translate(0 0)"
              />
            </g>
          </svg>

          <h3 class="mb-0 text-current font-normal">répondre</h3>
        </div>
      </button>
    </div>
    <forum-post-comment-input
      v-if="respond"
      :user="user"
      :post="post"
      :reply="reply"
    />
    <horizontal-line />
    <div v-if="repliesOpened && replies.length">
      <div class="pl-4">
        <forum-response
          v-for="reply in replies"
          :key="reply.id"
          :post="post"
          :user="user"
          :reply="reply"
          :can-respond="false"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import HorizontalLine from "../HorizontalLine.vue";
import ForumPostCommentInput from "./ForumPostCommentInput.vue";
import {
  computed,
  createVNode,
  defineComponent,
  ref,
  watch,
  PropType,
} from "vue";
import { User, VoteStatus } from "../../../../api/models";
import dayjs from "dayjs";
import { message, Modal } from "ant-design-vue";
import { PostService, AuthService } from "../../../services";
import { replaceURLs } from "../../../utils/str-utils";
import { PostResponse, ReplyResponse } from "../../../../api/responses";
import { EventKeys } from "../../../constants";
import { WarningOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ForumResposne",
  components: { HorizontalLine, ForumPostCommentInput },
  emits: [EventKeys.ReplyDeleted],
  props: {
    user: {
      type: Object as () => User,
    },
    post: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
    reply: {
      type: Object as PropType<ReplyResponse>,
      required: true,
    },
    canRespond: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const postService = new PostService();
    const respond = ref(false);
    const fullName = computed(
      () =>
        `${props.reply.user?.name} ${props.reply.user?.firstName} ${props.reply.user?.lastName}`
    );
    const avatar = computed(
      () =>
        `${props.reply.user?.firstName?.charAt(
          0
        )}${props.reply.user?.lastName?.charAt(0)}`
    );
    const fullDate = computed(
      () =>
        `${dayjs(props.reply.datePosted)
          .local()
          .format("DD MMMM YYYY")} à ${dayjs(props.reply.datePosted)
          .local()
          .format("HH:mm")}`
    );

    const commentBody = computed(() => replaceURLs(props.reply?.body));
    const isLoading = ref(false);
    const voteStatus = ref(VoteStatus);

    const skip = ref(0);
    const take = ref(10);

    const repliesOpened = ref(false);

    const replies = ref<ReplyResponse[]>([]);
    const getReplies = async () => {
      isLoading.value = true;
      const repliesResponse = await postService.getReplies(
        undefined,
        props.reply.id,
        undefined,
        skip.value,
        take.value
      );
      if (typeof repliesResponse == "string") {
        message.error(repliesResponse);
        isLoading.value = false;
        return [];
      }

      isLoading.value = false;
      return repliesResponse;
    };
    const onGetReplies = async () => {
      repliesOpened.value = !repliesOpened.value;
      if (repliesOpened.value) {
        replies.value = [];
        replies.value.push(...(await getReplies()));
      }
    };

    const onVote = async (status: VoteStatus) => {
      if (!props.user)
        message.info("Vous devez vous connecter pour placer votre vote");
      else {
        const reply = await postService.vote(
          undefined,
          props.reply.id.toString(),
          props.user?.id?.toString(),
          status
        );
        if (typeof reply !== "string") {
          props.reply.downvote = reply.downvote;
          props.reply.upvote = reply.upvote;
        } else {
          message.error(reply);
        }
      }
    };

    const authService = new AuthService();
    const isAuth = ref(authService.isAuthenticated);
    const isOwner = ref(authService.user?.id == props.post?.user?.id);
    watch(
      () => props.reply,
      () => (isOwner.value = authService.user?.id == props.reply?.user?.id)
    );

    const isAuthToRespond = ref(props.canRespond && isAuth.value);
    const onRespond = () =>
      (respond.value = !respond.value && isAuthToRespond.value);
    const onDelete = async () => {
      const postDeleted = await postService.delete(
        undefined,
        props.reply?.id?.toString(),
        props.user?.id?.toString() ?? ""
      );
      if (typeof postDeleted == "boolean") {
        isOwner.value = false;
        context.emit(EventKeys.ReplyDeleted, props.reply.id);
      } else message.error(postDeleted);
    };
    const showConfirmDeletion = () => {
      Modal.confirm({
        title: "Voulez-vous vraiment supprimer cette réponse?",
        icon: createVNode(WarningOutlined),
        okText: "Oui",
        cancelText: "Non",
        onOk: async () => await onDelete(),
        onCancel() {},
      });
    };

    const router = useRouter();
    const goToProfile = () =>
      router.push(`/app/profile/${props.reply.user.username}`);

    return {
      isAuth,
      onVote,
      avatar,
      isOwner,
      replies,
      respond,
      fullName,
      fullDate,
      onRespond,
      voteStatus,
      commentBody,
      goToProfile,
      onGetReplies,
      repliesOpened,
      showConfirmDeletion,
    };
  },
});
</script>
<style lang="scss" scoped>
.comment-body {
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
