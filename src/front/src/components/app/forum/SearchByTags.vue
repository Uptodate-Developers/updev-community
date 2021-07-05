<template>
  <a-list
    v-if="showPosts"
    :data-source="posts"
    :grid="{ column: 1 }"
    itemLayout="vertical"
  >
    <template #loadMore>
      <div class="flex justify-center py-2">
        <a-spin v-if="isLoading" />
        <button
          v-if="!isLoading && canLoadMore"
          @click="loadMore"
          class="text-blue-500 font-semibold focus:outline-none"
        >
          Charger plus...
        </button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <forum-post :post="item" :user="user" />
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { PostService } from "../../../services";
import { PostResponse } from "../../../../api/responses";
import { message } from "ant-design-vue";
import ForumPost from "./ForumPost.vue";
import { User } from "../../../../api/models";

export default defineComponent({
  name: "SearchByTags",
  components: { ForumPost },
  props: {
    user: {
      type: Object as () => User,
    },
    tags: {
      type: Object as () => string[],
      default: [],
    },
  },
  setup(props) {
    const postService = new PostService();
    const skip = ref(0);
    const take = ref(10);
    const isPopular = ref(true);
    const isLoading = ref(false);
    const posts = ref<PostResponse[]>([]);
    const canLoadMore = ref(false);
    const showPosts = ref(false);
    const onPosts = async (tags: string[]) => {
      isLoading.value = true;
      const postsResponse = await postService.getPostsForTags(
        tags,
        isPopular.value,
        skip.value,
        take.value
      );

      if (typeof postsResponse != "string") {
        isLoading.value = false;
        return postsResponse;
      } else message.error(postsResponse);
      isLoading.value = false;

      return [];
    };
    const getPosts = async () => {
      if (props.tags.length && props.tags.some((p) => typeof p == "string")) {
        showPosts.value = true;
        skip.value = 0;
        posts.value = await onPosts(props.tags);
        canLoadMore.value = posts.value.length >= take.value;
      } else showPosts.value = false;
    };

    const loadMore = async () => {
      skip.value = skip.value + take.value;
      const newPosts = await onPosts(props.tags);
      posts.value.push(...newPosts);

      canLoadMore.value = posts.value.length >= take.value;
    };

    watch(
      () => props.tags,
      async () => await getPosts()
    );

    onMounted(async () => await getPosts());

    return { showPosts, posts, canLoadMore, isLoading, loadMore };
  },
});
</script>

