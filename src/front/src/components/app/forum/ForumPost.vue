<template>
  <div v-if="post" class="bg-gray-50 py-2 rounded-md space-y-2">
    <div class="px-2 flex justify-between items-center">
      <div
        @click="goToProfile"
        class="flex space-x-2 cursor-pointer hover:text-blue-300"
      >
        <a-avatar
          :src="post.user.profilePicUrl"
          :style="{ backgroundColor: '#0068B7', verticalAlign: 'middle' }"
          :size="50"
          ><span
            style="line-height: 50px"
            class="block text-xl font-semibold"
            >{{ avatar }}</span
          >
        </a-avatar>
        <div>
          <h2 class="mb-0">{{ fullName }}</h2>
          <h3 class="text-gray-400 font-light">{{ fullDate }}</h3>
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

    <div>
      <h1
        @click="onNavigateToPostDetail"
        :class="canNavigateToPost ? 'cursor-pointer hover:text-blue-500' : ''"
        class="mx-4 text-gray-800"
      >
        {{ post.title }}
      </h1>
      <editor-read-only :content="editorContent" />
      <button
        v-if="canReadMore"
        @click="onReadMore"
        class="mx-4 text-blue-400 focus:outline-none"
      >
        {{ readMoreText }}
      </button>
    </div>

    <div
      v-if="post.photoUrls.length"
      class="img-container flex overflow-x-auto space-x-1 px-2"
    >
      <a-image-preview-group>
        <a
          v-for="url in post.photoUrls"
          :key="url"
          :href="url"
          :data-lightbox="post.slug"
        >
          <a-image
            :src="url"
            :alt="url"
            :preview="false"
            fallback="data:image/png;base64,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"
          />
        </a>
      </a-image-preview-group>
    </div>

    <div class="px-6 space-x-1">
      <button
        v-for="tag in post.hashtags"
        :key="tag"
        class="
          bg-gray-200
          px-4
          pb-0.5
          rounded-2xl
          text-xs text-gray-500
          focus:outline-none
        "
      >
        #{{ tag }}
      </button>
    </div>

    <div class="pt-2 px-2 flex flex-col lg:flex-row-reverse lg:justify-between">
      <p class="text-gray-400 self-end lg:self-stretch"></p>
      <div class="flex justify-around space-x-4 lg:space-x-12">
        <forum-vote-button :post="post" :vote-type="voteStatus.Up">
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
        </forum-vote-button>
        <forum-vote-button :post="post" :vote-type="voteStatus.Down">
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
        </forum-vote-button>
        <button @click="loadReplies" class="focus:outline-none">
          <div
            class="
              flex
              items-center
              space-x-1
              text-gray-900
              hover:text-blue-400
            "
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

            <h3 class="text-current mb-0 font-normal">
              {{ post.replyCounts }}
            </h3>
          </div>
        </button>
        <share-button :post="post"></share-button>
      </div>
    </div>

    <ForumCommentList
      v-bind="$attrs"
      @replyAdded="addReply"
      @replyDeleted="onReplyDeleted"
      :is-auth="isAuth"
      :post="post"
      :user="user"
      :replies="replies"
      :container-opened="containerOpened"
    />
  </div>
</template>
<script lang="ts">
import ForumResponse from "./ForumResponse.vue";
import HorizontalLine from "../HorizontalLine.vue";
import ForumVoteButton from "./ForumVoteButton.vue";
import ForumCommentList from "./ForumCommentList.vue";
import ForumPostCommentInput from "./ForumPostCommentInput.vue";
import useComment from "../../../composables/comment-composable";

import {
  computed,
  defineComponent,
  onMounted,
  createVNode,
  watch,
  ref,
  toRefs,
} from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { message } from "ant-design-vue";
import { EventKeys } from "../../../constants";
import EditorReadOnly from "../EditorReadOnly.vue";
import { WarningOutlined } from "@ant-design/icons-vue";
import { User, VoteStatus } from "../../../../api/models";
import useVote from "../../../composables/vote-composable";
import { PostService, AuthService } from "../../../services";
import { PostResponse, ReplyResponse } from "../../../../api/responses";
import { replaceURLs } from "../../../utils/str-utils";

dayjs.extend(utc);

export default defineComponent({
  name: "ForumPost",
  inheritAttrs: false,
  components: {
    EditorReadOnly,
    ForumResponse,
    HorizontalLine,
    ForumVoteButton,
    ForumCommentList,
    ForumPostCommentInput,
  },
  props: {
    post: {
      type: Object as () => PostResponse,
      required: true,
    },
    user: {
      type: Object as () => User,
    },
  },
  emits: [EventKeys.PostDeleted],
  setup(props, context) {
    const editorContent = ref(replaceURLs(props.post.body.substring(0, 300)));
    const readMoreText = ref("Lire la suite");
    const canReadMore = ref(props.post?.body?.length > 150);
    const isOpened = ref(false);
    const router = useRouter();
    const { voteStatus } = useVote("Post");

    const onReadMore = () => {
      if (canReadMore) {
        if (isOpened.value) {
          isOpened.value = false;
          editorContent.value = replaceURLs(props.post.body.substring(0, 300));
          readMoreText.value = "Lire la suite";
        } else {
          if (props.post.body.length > 1600) {
            onNavigateToPostDetail();
          } else {
            isOpened.value = true;
            editorContent.value = replaceURLs(props.post.body);
            readMoreText.value = "Reduire";
          }
        }
      }
    };
    const canNavigateToPost = ref(true);
    const onNavigateToPostDetail = () =>
      canNavigateToPost.value
        ? router.push(`/app/post/${props.post.slug}`)
        : {};

    const postService = new PostService();
    const fullName = computed(
      () =>
        `${props.post.user?.name} ${props.post.user?.firstName} ${props.post.user?.lastName}`
    );
    const avatar = computed(
      () =>
        `${props.post.user?.firstName?.charAt(
          0
        )}${props.post.user?.lastName?.charAt(0)}`
    );
    const fullDate = computed(
      () =>
        `${dayjs(props.post.datePosted)
          .local()
          .format("DD MMMM YYYY")} à ${dayjs(props.post.datePosted)
          .local()
          .format("HH:mm")}`
    );

    const authService = new AuthService();
    const isAuth = ref(authService.isAuthenticated);
    const isOwner = ref(authService.user?.id == props.post?.user?.id);
    watch(
      () => props.post,
      () => (isOwner.value = authService.user?.id == props.post?.user?.id)
    );

    const onDelete = async () => {
      const postDeleted = await postService.delete(
        props.post.id.toString(),
        undefined,
        props.user?.id?.toString() ?? ""
      );
      if (typeof postDeleted == "boolean") {
        isOwner.value = false;
        context.emit(EventKeys.PostDeleted, props.post.id);
      } else message.error(postDeleted);
    };
    const showConfirmDeletion = () => {
      Modal.confirm({
        title: "Voulez-vous vraiment supprimer ce post?",
        icon: createVNode(WarningOutlined),
        okText: "Oui",
        cancelText: "Non",
        onOk: async () => await onDelete(),
        onCancel() {},
      });
    };

    const { manager, loadReplies, setResource, addReply, onReplyDeleted } =
      useComment();

    const managerRefs = toRefs(manager);

    const replies = managerRefs.replies;
    const containerOpened = managerRefs.containerOpened;

    onMounted(() => {
      setResource({
        id: props.post.id,
        type: "Post",
      });
    });

    const goToProfile = () =>
      router.push(`/app/profile/${props.post.user.username}`);

    return {
      goToProfile,
      onReplyDeleted,
      showConfirmDeletion,
      isOwner,
      canNavigateToPost,
      onNavigateToPostDetail,
      readMoreText,
      canReadMore,
      onReadMore,
      isOpened,
      editorContent,
      fullName,
      avatar,
      fullDate,
      containerOpened,
      isAuth,
      replies,
      loadReplies,
      voteStatus,
      addReply,
    };
  },
});
</script>
<style>
.img-container::-webkit-scrollbar {
  display: none;
}

.ant-image-preview-img-wrapper {
  display: flex;
  align-items: center;
  justify-items: center;
}

.ant-image-img {
  height: 208px;
  width: 100%;
  min-width: 300px;
  object-fit: contain;
  max-width: none;
}

.ant-image {
  height: 208px;
  width: 100% !important;
}
</style>
