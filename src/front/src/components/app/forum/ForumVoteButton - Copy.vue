<template>
  <a-tooltip
    @visibleChange="handleTooltipVisibility"
    v-if="post"
    placement="top"
    arrow-point-at-center
  >
    <template #title>
      <div class="p-2 voters-tooltip">
        <a-spin>
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 24px"
            spin
          />
        </a-spin>
        <span>
          <a href="">Yannick</a>
        </span>
      </div>
    </template>
    <button
      @mouseover="loadVoters(voteStatus.Up)"
      @click="onVote(voteStatus.Up)"
      class="focus:outline-none"
    >
      <div
        :class="isUpvoted ? 'text-yellow-600' : 'hover:text-blue-400'"
        class="flex items-center space-x-1 text-gray-900"
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
          {{ post.upvote }}
        </h3>
      </div>
    </button>
  </a-tooltip>
  <a-tooltip
    @visibleChange="handleTooltipVisibility"
    v-if="post"
    placement="top"
    arrow-point-at-center
  >
    <template #title>
      <div class="p-2 voters-tooltip">
        <a-spin>
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 24px"
            spin
          />
        </a-spin>
        <span>
          <a href="">Yannick</a>
        </span>
      </div>
    </template>
    <button
      @mouseover="loadVoters(voteStatus.Down)"
      @click="onVote(voteStatus.Down)"
      class="focus:outline-none"
    >
      <div
        :class="isDownvoted ? 'text-yellow-600' : 'hover:text-blue-400'"
        class="flex items-center space-x-1 text-gray-900"
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
          {{ post.downvote }}
        </h3>
      </div>
    </button>
  </a-tooltip>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, PropType } from "vue";
import { User, VoteStatus } from "../../../../api/models";
import { PostResponse } from "../../../../api/responses";
import { PostService } from "../../../services";
import { message } from "ant-design-vue";
import useVote from "../../../composables/vote-composable";

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
    user: {
      type: Object as PropType<User>,
    },
  },
  setup(props) {
    const postService = new PostService();

    const { isLoading, loadVoters, handleTooltipVisibility } = useVote("Post");

    const voteStatus = ref(VoteStatus);
    const isUpvoted = ref(false);
    const isDownvoted = ref(false);

    const onVote = async (status: VoteStatus) => {
      if (!props.user)
        message.info("Vous devez vous connecter pour placer votre vote");
      else {
        const post = await postService.vote(
          props.post.id.toString(),
          undefined,
          props.user.id.toString(),
          status
        );
        if (typeof post !== "string") {
          props.post.downvote = post.downvote;
          props.post.upvote = post.upvote;
          isUpvoted.value = status == VoteStatus.Up;
          isDownvoted.value = status == VoteStatus.Down;
        } else {
          message.error(post);
        }
      }
    };
    const onGetVoteStatus = async () => {
      const voteStatusResponse = await postService.getVoteStatus(
        props.post.id.toString(),
        undefined,
        props.user?.id.toString()
      );
      if (typeof voteStatusResponse == "string")
        console.log(voteStatusResponse);
      else {
        isUpvoted.value = voteStatusResponse.status == VoteStatus.Up;
        isDownvoted.value = voteStatusResponse.status == VoteStatus.Down;
      }
    };

    watch(
      () => props.post,
      async () => {
        await onGetVoteStatus();
      }
    );

    watch(isLoading, (value) => {
      console.log("isLoading", value);
    });

    onMounted(async () => await onGetVoteStatus());

    return {
      onVote,
      isLoading,
      isUpvoted,
      loadVoters,
      voteStatus,
      isDownvoted,
      handleTooltipVisibility,
    };
  },
});
</script>
<style lang="scss" scoped>
.voters-tooltip {
  span {
    display: block;
    line-height: 1.2;
    a {
      color: #fff;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>