<template>
  <button
    class="
      border-2 border-blue-400
      rounded-md
      px-6
      py-2
      hover:border-blue-300
      outline-none
      focus:outline-none
    "
    :disabled="loading"
  >
    <div
      class="
        flex
        items-center
        justify-center
        space-x-4
        text-blue-400
        hover:text-blue-200
      "
    >
      <img class="max-h-8" :src="img" :alt="title" />
      <p class="mb-0 text-md">{{ title }}</p>
      <a-spin v-if="loading">
        <a-icon slot="indicator" type="loading" style="font-size: 30px" spin />
      </a-spin>
    </div>
  </button>
</template>
<script>
export default {
  name: "ButtonIcon",
  props: {
    img: String,
    title: String,
    loading: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
