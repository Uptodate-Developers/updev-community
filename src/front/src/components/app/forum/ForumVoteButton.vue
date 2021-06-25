<template>
  <a-tooltip
    @visibleChange="handleTooltipVisibility"
    v-if="post"
    placement="top"
    arrow-point-at-center
  >
    <template #title>
      <div class="p-2 voters-tooltip">
        <a-spin v-if="isLoading">
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 24px"
            spin
          />
        </a-spin>
        <span v-for="user in users">
          <a @click="goToProfile(user)" href="#">{{ getFullName(user) }}</a>
        </span>
        <span v-if="!isLoading && users.length === 0">
          <a href="#">Aucun</a>
        </span>
      </div>
    </template>
    <button @click="onVote" class="focus:outline-none">
      <div
        :class="isUpvoted ? 'text-yellow-600' : 'hover:text-blue-400'"
        class="flex items-center space-x-1 text-gray-900"
      >
        <slot></slot>
        <h3 class="text-current fill-current mb-0 font-normal">
          {{ voteType === voteStatus.Up ? post.upvote : post.downvote }}
        </h3>
      </div>
    </button>
  </a-tooltip>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { AuthService, PostService } from "../../../services";
import { PostResponse } from "../../../../api/responses";
import { User, VoteStatus } from "../../../../api/models";
import useVote from "../../../composables/vote-composable";
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  PropType,
  reactive,
} from "vue";

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
    voteType: {
      type: String as PropType<VoteStatus>,
      required: true,
    },
  },
  setup(props) {
    const postService = new PostService();
    const authService = new AuthService();
    const router = useRouter();

    const user = reactive(authService.user);

    const { users, isLoading, setParams, handleTooltipVisibility } = useVote(
      "Post"
    );

    const voteStatus = ref(VoteStatus);
    const isUpvoted = ref(false);
    const isDownvoted = ref(false);

    const getFullName = (user: User): string => {
      return `${user.name} ${user.firstName} ${user.lastName}`;
    };
    const goToProfile = (user: User): void => {
      return router.push(`/app/profile/${user.username}`);
    };

    const onVote = async (): Promise<void> => {
      if (!user) {
        message.info("Vous devez vous connecter pour placer votre vote");
      } else {
        const status = props.voteType;
        const post = await postService.vote(
          props.post.id.toString(),
          undefined,
          user.id.toString(),
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
    const onGetVoteStatus = async (): Promise<void> => {
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

    onMounted(async () => {
      await onGetVoteStatus();
      setParams({
        id: props.post.id,
        status: props.voteType,
      });
    });

    return {
      users,
      onVote,
      isLoading,
      isUpvoted,
      voteStatus,
      getFullName,
      isDownvoted,
      goToProfile,
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