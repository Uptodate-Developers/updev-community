<template>
  <QuillEditor style="border:none" :options="options" :content="contentInHtml" contentType="html"  />
</template>
<script lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import {defineComponent,reactive,ref} from "vue"

export default defineComponent({
  name:"Editor",
  components: {QuillEditor},
  props:{
    content:String
  },
  setup(props){
    const options = reactive({
      modules: {
        toolbar: ""
      },
      readOnly: true,
      theme: 'snow'
    })
    const contentInHtml = ref(props.content)

    return {contentInHtml,options}
  }
})
</script>