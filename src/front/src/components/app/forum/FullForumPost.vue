<template>
  <div v-if="post" class="bg-gray-50 py-2 rounded-md space-y-2">
    <div class="px-2 flex space-x-2">
      <a-avatar
        :src="post.user.profilePicUrl"
        :style="{ backgroundColor: '#0068B7', verticalAlign: 'middle' }"
        :size="50"
        ><span style="line-height: 50px" class="block text-xl font-semibold">{{
          avatar
        }}</span></a-avatar
      >
      <div>
        <h2 class="mb-0">{{ fullName }}</h2>
        <h3 class="text-gray-400 font-light">{{ fullDate }}</h3>
      </div>
    </div>

    <div>
      <h1 class="mx-4 text-gray-800">{{ post.title }}</h1>
      <editor-read-only :content="editorContent" :full-content="post.body" />
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
      :is-loading="isLoading"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  toRefs,
  watch,
} from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { User, VoteStatus } from "../../../../api/models";
import { PostResponse } from "../../../../api/responses";
import { EventKeys } from "../../../constants";
import { message } from "ant-design-vue";
import EditorReadOnly from "../EditorReadOnly.vue";
import { useRouter } from "vue-router";
import ForumVoteButton from "./ForumVoteButton.vue";
import ForumCommentList from "./ForumCommentList.vue";
import useVote from "../../../composables/vote-composable";
import useComment from "../../../composables/comment-composable";
import { replaceURLs } from "../../../utils/str-utils";

dayjs.extend(utc);

export default defineComponent({
  name: "FullForumPost",
  inheritAttrs: false,
  components: {
    EditorReadOnly,
    ForumVoteButton,
    ForumCommentList,
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
  emits: [EventKeys.TagSelected],
  setup(props) {
    const editorContent = ref(
      props.post?.body ? replaceURLs(props.post.body) : ""
    );

    const isAuth = ref(props.user !== null && props.user !== undefined);
    const fullName = computed(() => props.post.user?.name);
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

    const { voteStatus } = useVote("Post");

    const { manager, loadReplies, setResource, addReply, onReplyDeleted } =
      useComment();

    const managerRefs = toRefs(manager);

    const replies = managerRefs.replies;
    const isLoading = managerRefs.isLoading;
    const containerOpened = managerRefs.containerOpened;

    watch(
      () => props.post,
      () => {
        editorContent.value = replaceURLs(props.post.body);
      }
    );

    onMounted(() => {
      setResource({
        id: props.post.id,
        type: "Post",
      });
    });

    return {
      avatar,
      isAuth,
      replies,
      fullName,
      fullDate,
      addReply,
      isLoading,
      voteStatus,
      loadReplies,
      editorContent,
      containerOpened,
      onReplyDeleted,
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
