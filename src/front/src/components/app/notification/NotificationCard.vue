<template>
  <div class="ant-row bg-gray-50 px-2 py-1">
    <div class="ant-col ant-col-3 flex items-center justify-center">
      <a-avatar
        :style="{ backgroundColor: '#0068B7', verticalAlign: 'middle' }"
        :size="40"
      >
        <span
          style="line-height: 40px"
          class="block text-xl font-semibold text-uppercase"
        >
          {{ avatar }}
        </span>
      </a-avatar>
    </div>
    <div class="ant-col ant-col-18 col-content px-1">
      <h2>
        <span class="text-gray-500">{{ notif.body.title }}</span>
      </h2>
      <h3 class="text-xs">{{ notif.body.content }}</h3>
    </div>
    <div
      class="ant-col ant-col-3 flex flex-col justify-center items-end space-y-2"
    >
      <span class="mb-0 text-sm text-gray-400">{{ time }}</span>
      <div v-if="isNew" class="rounded-md h-2 w-2 bg-yellow-300"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { NotificationResponse } from "../../../../api/responses";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default defineComponent({
  name: "NotificationCard",
  props: {
    isNew: Boolean,
    notif: {
      type: Object as PropType<NotificationResponse>,
      required: true,
    },
  },
  setup(props) {
    const avatar = computed(() => props.notif.body.title.substr(0, 2));

    const time = ref(
      `${dayjs(props.notif?.createdAt).local().toDate().getHours()}h${dayjs(
        props.notif?.createdAt
      )
        .local()
        .toDate()
        .getMinutes()}`
    );
    return { time, avatar };
  },
});
</script>
<style lang="scss" scoped>
.ant-row {
  .ant-col {
    &:not(.col-content) {
      display: flex;
    }
  }
}
</style>
