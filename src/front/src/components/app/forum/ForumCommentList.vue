<template>
  <div v-if="containerOpened">
    <horizontal-line v-if="isAuth" />
    <forum-post-comment-input
      v-bind="$attrs"
      v-if="isAuth"
      :post="post"
      class="px-1 py-2"
    />
    <horizontal-line />
  </div>

  <div
    is="transition-group"
    name="fade-from-right"
    class="list-group"
    v-if="containerOpened && replies.length"
  >
    <forum-response
      v-bind="$attrs"
      v-for="reply in replies"
      :key="reply.id"
      :post="post"
      :user="user"
      :reply="reply"
      :can-respond="true"
    />
  </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import { User } from "../../../../api/models";
import ForumResponse from "./ForumResponse.vue";
import HorizontalLine from "../HorizontalLine.vue";
import ForumPostCommentInput from "./ForumPostCommentInput.vue";
import { ReplyResponse, PostResponse } from "../../../../api/responses";

export default defineComponent({
  name: "ForumCommentList",
  inheritAttrs: false,
  components: {
    ForumResponse,
    HorizontalLine,
    ForumPostCommentInput,
  },
  props: {
    isAuth: {
      type: Boolean,
      required: true,
    },
    containerOpened: {
      type: Boolean,
      required: true,
    },
    replies: {
      type: Array as PropType<ReplyResponse[]>,
      default: () => [],
      required: true,
    },
    user: {
      type: Object as () => PropType<User>,
      required: true,
    },
    post: {
      type: Object as () => PropType<PostResponse>,
      required: true,
    },
  },
  setup() {},
});
</script>
