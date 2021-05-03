<template>
  <QuillEditor @textChange="onTextChange" v-model:content="contentInHtml" contentType="html" :options="options" toolbar="essential" />
</template>
<script lang="ts">
import { QuillEditor,Delta} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import {defineComponent,reactive,ref} from "vue"

export default defineComponent({
  name:"Editor",
  components: {QuillEditor},
  emits:["contentChanged"],
  setup(props,context){
    const options = reactive({
      placeholder: 'Que voulez-vous poster?',
      theme: 'snow'
    })
    const contentInHtml = ref("<div></div>")

    const onTextChange = (newText:Delta,oldText:Delta,source) =>  context.emit('contentChanged',contentInHtml)
    return {contentInHtml,options,onTextChange}
  }
})
</script>