<template>
  <div v-if="isLoading" class="flex items-center justify-center">
    <a-spin />
  </div>
  <div class="space-y-2 md:hidden">
    <div v-if="!isLoading" class="space-y-4">
      <ForumPost
        @replyAdded="onNewReply"
        :key="key"
        :post="post"
        :user="user"
      />
      <!-- <UserProfile :user="postUser" />
      <PopularTopics
        sectionTitle="Autres posts"
        :tags="tags"
        :exceptPost="post"
      /> -->
    </div>
  </div>
  <div
    v-if="!isLoading"
    class="hidden container mx-auto md:grid grid-cols-9 gap-2 py-2 xl:px-28"
  >
    <div class="col-span-6">
      <ForumPost @replyAdded="onNewReply" :post="post" :user="user" />
    </div>
    <div
      class="
        space-y-3
        col-span-3
        md:sticky
        top-16
        h-screen
        z-20
        overflow-y-auto
        hiddescrollbar
      "
    >
      <UserProfile :user="postUser" />
      <PopularTopics
        sectionTitle="Autres posts"
        :tags="tags"
        :exceptPost="post"
      />
    </div>
  </div>
</template>
<script lang="ts">
import UserProfile from "../components/app/ShortUserProfile.vue";
import ForumPost from "../components/app/forum/FullForumPost.vue";
import PopularTopics from "../components/app/PopularTopics.vue";
import { defineComponent, ref, onMounted, watch, inject } from "vue";
import { AuthService, PostService } from "../services";
import { message } from "ant-design-vue";
import { useMeta } from "vue-meta";
import { io } from "socket.io-client";

export default defineComponent({
  name: "AppPost",
  components: { UserProfile, ForumPost, PopularTopics },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  setup(props, context) {
    const authService = new AuthService();
    const postService = new PostService();
    const isLoading = ref(true);
    const post = ref(undefined);
    const user = ref(authService.user);
    const postUser = ref(undefined);
    const tags = ref<string[]>([]);
    const key = ref(0);

    const onLoadPost = async () => {
      isLoading.value = true;
      const response = await postService.getPost(props.id.toString());
      if (typeof response == "string") message.error(response);
      else {
        post.value = response;
        postUser.value = response.user;
        tags.value = response.hashtags;
        forceUpdate();
      }
      isLoading.value = false;
    };

    const forceUpdate = () => key.value++;

    const onNewReply = () => {
      // @ts-ignore
      post.value.replyCounts++;
    };

    onMounted(async () => await onLoadPost());

    watch(
      () => props.id,
      async () => await onLoadPost()
    );

    onMounted(() => {
      // const socket = inject("socket");
      // console.log("socket", socket);

      // socket.on("connect", () => {
      //   console.log("connected to server");
      // });

      // socket.on("notification", function (data) {
      //   console.log("This event was fired by - on", data);
      // });

      // socket.on("connection", (data) => {
      //   console.log("connections", data);
      // });
      // socket.on("disconnect", (data) => {
      //   console.log("disconnected", data);
      // });

      // @ts-ignore
      // const socket = io("http://localhost:5000?uid=1234", {
      //   path: "/socket.io",
      // });

      // socket.on("connect", () => {
      //   console.log("connected to server");
      // });
    });

    return { key, post, user, postUser, tags, isLoading, onNewReply };
  },
});
</script>
<style scoped>
.hiddescrollbar::-webkit-scrollbar {
  display: none;
}
</style>
