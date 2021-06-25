<template>
  <div class="bg-gray-50 px-2 py-2 rounded-md">
    <div class="grid grid-cols-8 lg:grid-cols-10">
      <a-avatar
        :src="user.profilePicUrl"
        :style="{ backgroundColor: '#0068B7', verticalAlign: 'middle' }"
        :size="40"
        ><span style="line-height: 40px" class="block text-xl font-semibold">{{
          avatar
        }}</span></a-avatar
      >
      <new-post-input
        v-bind="$attrs"
        :user="user"
        class="col-span-7 lg:col-span-9"
      />
    </div>
  </div>
</template>
<script lang="ts">
import NewPostInput from "./NewPostInput.vue";
import { computed, defineComponent } from "vue";
import { User } from "../../../../api/models/User";

export default defineComponent({
  name: "NewPost",
  components: { NewPostInput },
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  setup({ user }) {
    const fullName = computed(
      () => `${user.name} ${user.firstName} ${user.lastName}`
    );
    const avatar = computed(
      () => `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
    );

    return { fullName, avatar };
  },
});
</script>
