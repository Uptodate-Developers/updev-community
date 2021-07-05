<template>
  <div
    v-if="user"
    v-for="subnotifications in groupedNotifications"
    :key="subnotifications"
  >
    <h3 class="text-xs px-2 text-capitalize">
      {{ formatDate(subnotifications[0].post.createdAt) }}
    </h3>
    <div v-for="notif in subnotifications" :key="notif" class="space-y-1">
      <a @click="goToPost(notif)">
        <notification-card class="my-1" :notif="notif" />
      </a>
    </div>
  </div>
  <div
    class="flex justify-center align-items-center pt-5"
    :class="{ 'reload-container': notifications.length === 0 }"
  >
    <div class="p-3">
      <a-spin v-if="loading">
        <a-icon slot="indicator" type="loading" style="font-size: 30px" spin />
      </a-spin>
      <button
        class="reload-btn"
        type="button"
        v-if="!loading && user"
        @click="onGetNotifications"
      >
        <ReloadOutlined
          :style="{ fontSize: '30px', color: '#08c', cursor: 'pointer' }"
        />
      </button>
      <p v-if="!user">Vous devez vous identifier pour voir vos notifications</p>
    </div>
  </div>
</template>
<script lang="ts">
import NotificationCard from "./NotificationCard.vue";
import { defineComponent, computed, onMounted, ref, watch } from "vue";
import { AuthService } from "../../../services";

import { useRouter } from "vue-router";
import { formatDate } from "./../../../utils/date-utils";
import { ReloadOutlined } from "@ant-design/icons-vue";
import { NotificationResponse } from "../../../../api/responses";
import { useNotificationStore } from "./../../../store/notification";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default defineComponent({
  name: "Notifications",
  components: { NotificationCard, ReloadOutlined },
  setup() {
    const authService = new AuthService();

    const user = ref(authService.user);
    const router = useRouter();
    const groupedNotifications = ref([]);
    const store = useNotificationStore();

    const loading = computed(() => store.loading);
    const notifications = computed(() => store.notifications);

    const onGetNotifications = async () => {
      if (user.value) {
        await store.loadNotifications(user.value.id);
        await store.markAsRead(user.value.id);
      }
    };

    watch(notifications, (value) => {
      // console.log("notifications", notifications);
      const notifs = groupBy(value, (x) =>
        dayjs(x.createdAt).toDate().getDate()
      );
      groupedNotifications.value = notifs.values();
    });
    onMounted(onGetNotifications);

    const goToPost = (notif: NotificationResponse) => {
      if (notif && notif.post) {
        router.push(`/app/post/${notif.post?.slug}`);
      }
    };

    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    }

    // const socket = inject("socket");

    // // socket.subscribe("notification", function (data) {
    // //   console.log("This event was fired by - subscribe", data);
    // // });
    // socket.on("notification", function (data) {
    //   console.log("This event was fired by - on", data);
    // });

    // socket.on("connections", (data) => {
    //   console.log("connections", data);
    // });
    // socket.on("disconnect", (data) => {
    //   console.log("disconnected", data);
    // });
    return {
      goToPost,
      user,
      loading,
      formatDate,
      notifications,
      onGetNotifications,
      groupedNotifications,
    };
  },
});
</script>
<style lang="scss" scoped>
.reload-container {
  min-height: 50vh;
  flex-direction: column;
}
.reload-btn:focus {
  outline: 0;
}
</style>
