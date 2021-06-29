<template>
  <QuillEditor
    v-model:content="contentInHtml"
    contentType="html"
    :options="options"
  />
</template>
<script lang="ts">
import { QuillEditor, Delta } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "quill-emoji/dist/quill-emoji.css";
import { defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "Editor",
  components: { QuillEditor },
  emits: ["contentChanged"],
  setup(props, { emit }) {
    const options = reactive({
      modules: {
        syntax: true,
        toolbar: [
          ["bold", "italic", "underline"],
          ["link"],
          [{ header: 1 }, { header: 2 }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
        ],
      },
      placeholder: "Que voulez-vous poster?",
      theme: "snow",
    });
    const contentInHtml = ref("<div></div>");

    watch(contentInHtml, (newVal) => {
      emit("contentChanged", newVal);
    });

    // const onTextChange = (newText: Delta, oldText: Delta, source) =>
    //   context.emit("contentChanged", contentInHtml.value);
    return { contentInHtml, options };
  },
});
</script>
