<template>
  <div class="md:hidden">
    <a-tabs class="bg-gray-50" v-model:activeKey="selectedTab">
      <a-tab-pane key="1" tab="Forum">
        <div class="bg-gray-200 space-y-1 -mt-4 px-1 py-1">
          <feed :user="user" :tags="selectedTags" @tagRemoved="onTagRemoved" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tendances" force-render>
        <div class="bg-gray-200 space-y-1 -mt-4 px-1 py-1">
          <popular-topics :user="user" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Hashtags" force-render>
        <div class="bg-gray-200 space-y-1 -mt-4 px-1 py-1">
          <side-hasg-tags
            @tagSelected="onTagSelected"
            :tagRemoved="removeTags"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  <div class="hidden container mx-auto md:grid grid-cols-9 gap-2 py-2 xl:px-28">
    <div
      class="
        col-span-2
        md:sticky
        top-16
        h-screen
        z-20
        space-y-1
        overflow-y-auto
        hiddescrollbar
      "
    >
      <connected v-if="isAuthenticated" :user="user" />
      <not-connected v-if="!isAuthenticated" />
      <side-hasg-tags @tagSelected="onTagSelected" :tagRemoved="removeTags" />
    </div>
    <div class="col-span-4">
      <feed :user="user" :tags="selectedTags" />
    </div>
    <div
      class="
        col-span-3
        md:sticky
        top-16
        h-screen
        z-20
        overflow-y-auto
        hiddescrollbar
      "
    >
      <popular-topics :user="user" />
    </div>
  </div>
</template>
<script>
import Feed from "../components/app/forum/Feed.vue";
import NotConnected from "../components/app/NotConnected.vue";
import PopularTopics from "../components/app/PopularTopics.vue";
import SideHasgTags from "../components/app/forum/SideHashtags.vue";
import Connected from "../components/app/ShortUserProfile.vue";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { AuthService, HashTagService } from "../services";
import { useMeta } from "vue-meta";
import { handlePermission } from "./../utils/push-notifications";

export default defineComponent({
  name: "AppHome",
  components: { Feed, NotConnected, PopularTopics, SideHasgTags, Connected },
  setup() {
    const authService = new AuthService();
    const tagService = new HashTagService();
    const user = reactive(authService.user);
    const isAuthenticated = ref(authService.isAuthenticated);
    const selectedTags = ref(tagService.selectedTags);
    const selectedTab = ref("1");
    const removeTags = ref(false);

    const onTagSelected = (tags) => {
      selectedTags.value = tags;
      selectedTab.value = "1";
    };

    const onTagRemoved = () => (removeTags.value = !removeTags.value);

    useMeta({
      title: "Forum",
    });

    onMounted(handlePermission);

    return {
      selectedTab,
      user,
      isAuthenticated,
      selectedTags,
      onTagSelected,
      removeTags,
      onTagRemoved,
    };
  },
});
</script>
<style scoped>
.hiddescrollbar::-webkit-scrollbar {
  display: none;
}
</style>
