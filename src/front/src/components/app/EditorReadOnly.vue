<template>
  <div class="relative">
    <div class="absolute h-full w-full bg-transparent z-20"></div>
    <QuillEditor
      style="border: none"
      :key="contentUpdated"
      :options="options"
      v-model:content="contentInHtml"
      contentType="html"
    />
  </div>
</template>
<script lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "Editor",
  components: { QuillEditor },
  props: {
    content: String,
  },
  setup(props) {
    const options = reactive({
      modules: {
        syntax: true,
        toolbar: "",
      },
      readOnly: true,
      theme: "snow",
    });
    const contentInHtml = ref(props.content);
    const contentUpdated = ref(false);

    watch(
      () => props.content,
      () => {
        contentInHtml.value = props.content;
        contentUpdated.value = !contentUpdated.value;
      }
    );

    return { contentUpdated, contentInHtml, options };
  },
});
</script>