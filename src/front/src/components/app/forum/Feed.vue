<template>
  <div class="space-y-1">
    <new-post @postAdded="onPostAdded" v-if="isAuth" :user="user" />
    <not-connected v-if="!isAuth" class="md:hidden" />
    <hash-tags
      class="md:hidden"
      :tags="tags"
      @tagSelected="onTagSelected"
      @tagRemoved="onTagRemoved"
      :hide-tags="hideTags"
    />

    <a-list
      v-if="!selectedTags.length"
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
          <forum-post
            @postDeleted="onPostDeleted"
            @replyAdded="onNewReply"
            :post="item"
            :user="user"
          />
        </a-list-item>
      </template>
    </a-list>

    <search-by-tags :user="user" :tags="selectedTags" />
  </div>
</template>
<script lang="ts">
import NewPost from "./NewPost.vue";
import HashTags from "./Hashtag.vue";
import ForumPost from "./ForumPost.vue";
import { message } from "ant-design-vue";
import SearchByTags from "./SearchByTags.vue";
import { EventKeys } from "../../../constants";
import { User } from "../../../../api/models";
import NotConnected from "../NotConnected.vue";
import { PostService } from "../../../services";
import { PostResponse, ReplyResponse } from "../../../../api/responses";
import { defineComponent, ref, onMounted, watch } from "vue";

export default defineComponent({
  name: "Feed",
  components: { NewPost, SearchByTags, NotConnected, HashTags, ForumPost },
  emits: [EventKeys.TagRemoved],
  props: {
    user: {
      type: Object as () => User,
    },
    tags: {
      type: Object as () => string[],
      default: [],
    },
  },
  setup(props, context) {
    const postService = new PostService();
    const isAuth = props.user ? true : false;
    const skip = ref(0);
    const take = ref(10);
    const isRecent = ref(true);
    const isPopular = ref(false);
    const isLoading = ref(false);
    const posts = ref<PostResponse[]>([]);
    const hideTags = ref(false);
    const canLoadMore = ref(false);
    const onPosts = async () => {
      isLoading.value = true;
      const postsResponse = await postService.getPosts(
        skip.value,
        take.value,
        isRecent.value,
        isPopular.value
      );

      if (typeof postsResponse != "string") {
        isLoading.value = false;
        return postsResponse;
      } else message.error(postsResponse);
      isLoading.value = false;

      return [];
    };
    const selectedTags = ref(props.tags);

    onMounted(async () => {
      posts.value = await onPosts();
      canLoadMore.value = posts.value.length >= take.value;
    });

    const loadMore = async () => {
      skip.value = skip.value + take.value;
      const newPosts = await onPosts();
      posts.value.push(...newPosts);
      canLoadMore.value = posts.value.length >= take.value;
    };

    watch(
      () => props.tags,
      async () => {
        selectedTags.value = props.tags;
        hideTags.value = selectedTags.value.length > 0;
      }
    );

    const onPostAdded = (post: PostResponse) => {
      if (post) {
        posts.value.unshift(post);
      }
    };

    const onTagSelected = async (tags: string[]) => {
      selectedTags.value = tags;
      hideTags.value = selectedTags.value.length > 0;
    };

    const onTagRemoved = () => context.emit(EventKeys.TagRemoved);

    const onPostDeleted = (postId: string) => {
      const index = posts.value.findIndex((p) => p.id.toString() == postId);
      if (index > -1) {
        posts.value.splice(index, 1);
      }
    };

    const onNewReply = (reply: ReplyResponse) => {
      if (reply.postId) {
        const post = posts.value.find((p) => p.id === reply.postId);
        if (post) {
          // @ts-ignore
          post.replyCounts++;
        }
      }
    };

    return {
      onPostDeleted,
      selectedTags,
      canLoadMore,
      isLoading,
      isAuth,
      posts,
      hideTags,
      loadMore,
      onTagSelected,
      onTagRemoved,
      onPostAdded,
      onNewReply,
    };
  },
});
</script>
