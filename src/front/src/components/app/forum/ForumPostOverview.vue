<template>
  <div
    @click="onNavigateToPostDetail"
    class="px-4 py-2 bg-gray-50 cursor-pointer"
  >
    <h1 class="text-gray-800">{{ post.title }}</h1>
    <EditorReadOnly :content="post.body.substring(0, 300)" />
    <div class="py-2 space-x-1">
      <button
        v-for="tag in post.hashtags"
        :key="tag"
        class="bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500 focus:outline-none"
      >
        #{{ tag }}
      </button>
    </div>
    <div class="flex justify-between items-center">
      <a-avatar
        :src="post.user.profilePicUrl"
        :style="{ backgroundColor: '#9C9C9C', verticalAlign: 'middle' }"
        :size="35"
        ><span style="line-height: 35px" class="block text-sm font-semibold">{{
          avatar
        }}</span></a-avatar
      >
      <div class="flex space-x-4">
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
        <div class="flex items-center space-x-1">
          <img src="../../../assets/icons/comment.svg" alt="Comment" />
          <h3 class="mb-0 font-normal">{{ post.replyCounts }}</h3>
        </div>
      </div>
    </div>
    <horizontal-line class="mt-2" />
  </div>
</template>
<script lang="ts">
import HorizontalLine from "../HorizontalLine.vue";
import { computed, defineComponent } from "vue";
import { PostResponse } from "../../../../api/responses";
import EditorReadOnly from "../EditorReadOnly.vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import utc from "dayjs/plugin/utc";
import ForumVoteButton from "./ForumVoteButton.vue";
import useVote from "../../../composables/vote-composable";

dayjs.extend(utc);

export default defineComponent({
  name: "ForumPostOverview",
  components: { EditorReadOnly, HorizontalLine, ForumVoteButton },
  props: {
    post: {
      type: Object as () => PostResponse,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
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

    const onNavigateToPostDetail = () =>
      router.push(`/app/post/${props.post.id}`);

    const { voteStatus } = useVote("Post");

    return { fullName, avatar, fullDate, voteStatus, onNavigateToPostDetail };
  },
});
</script>
