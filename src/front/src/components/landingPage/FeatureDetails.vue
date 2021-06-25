<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <img class="mx-auto" :src="iconLink" alt="" />
    <p
      style="align-self: center"
      class="text-gray-600 max-w-md text-center mx-auto"
    >
      {{ details }}
    </p>
  </div>
</template>
<script>
export default {
  name: "FeatureDetails",
  props: {
    details: String,
    iconLink: String,
  },
};
</script>