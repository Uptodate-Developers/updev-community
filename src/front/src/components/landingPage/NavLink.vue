<template>
  <router-link
    :to="link"
    v-scroll-to="scrollToLink"
    class="text-md text-gray-500 font-normal landing"
  >
    {{ title }}
  </router-link>
</template>
<script>
export default {
  name: "NavLink",
  props: {
    title: String,
    link: String,
    scrollToLink: String,
  },
  emits: ["link-clicked"],
  methods: {},
};
</script>
