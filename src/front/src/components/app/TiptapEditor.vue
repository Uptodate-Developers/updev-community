<template>
  <div class="border -mx-4 -my-4 px-2 py-2">
    <div v-if="editor && canEdit" class="border -mx-2 -my-2.5 flex divide-x" >
      <button class="py-2 px-2" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <svg class="stroke-current h-4 w-4" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
          <path d="M6,4h8a4,4,0,0,1,4,4h0a4,4,0,0,1-4,4H6Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          <path d="M6,12h9a4,4,0,0,1,4,4h0a4,4,0,0,1-4,4H6Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      </button>
      <button class="py-2 px-2" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <svg class="h-4 w-4 fill-current stroke-current" enable-background="new 0 0 32 32"  id="svg2" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"    >
          <g id="background"><rect fill="none" /></g>
          <g id="text_x5F_italic"><polygon points="12,2 12,4 16,4 12,28 8,28 8,30 20,30 20,28 16,28 20,4 24,4 24,2  "/></g>
        </svg>
      </button>
      <button class="py-2 px-2" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        <svg class="h-4 w-4 fill-current stroke-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="menu " id="menu_">
          <path d="M29,6H3A1,1,0,0,0,3,8H29a1,1,0,0,0,0-2Z"/>
          <path d="M3,17H16a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/>
          <path d="M25,24H3a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z"/></g>
        </svg>
      </button>
      <button class="py-2 px-2" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        <svg class="h-4 w-4 fill-current stroke-current"  version="1.1" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg">
          <path d="M783.2 198.53c-7.12 0-14.06-3.63-17.96-10.18l-50.2-84.11c-3.76-6.29-10.63-10.19-17.96-10.19H117.6c-7.32 0-14.19 3.91-17.95 10.19l-50.19 84.11c-5.92 9.92-18.74 13.15-28.66 7.23-9.91-5.92-13.14-18.74-7.23-28.66l50.2-84.11c11.27-18.85 31.89-30.56 53.84-30.56h579.48c21.96 0 42.57 11.71 53.84 30.56l50.2 84.11c5.92 9.92 2.67 22.74-7.22 28.66-3.38 2-7.05 2.95-10.71 2.95z" fill="#333333"/>
          <path d="M407.35 971.76c-11.54 0-20.9-9.35-20.9-20.9V73.14c0-11.54 9.36-20.9 20.9-20.9s20.9 9.36 20.9 20.9v877.71c-0.01 11.56-9.36 20.91-20.9 20.91z" fill="#333333"/>
          <path d="M992.49 344.82H574.53c-11.55 0-20.9-9.36-20.9-20.9s9.35-20.9 20.9-20.9h417.96c11.55 0 20.9 9.36 20.9 20.9s-9.35 20.9-20.9 20.9z" fill="#333333"/>
          <path d="M783.51 971.76c-11.55 0-20.9-9.35-20.9-20.9V323.92c0-11.54 9.35-20.9 20.9-20.9s20.9 9.36 20.9 20.9v626.94c0 11.55-9.35 20.9-20.9 20.9z" fill="#333333"/>
        </svg>
      </button>
      <button class="py-2 px-2" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <svg class="h-4 w-4" viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h48v48H0V0z" fill="none"/>
          <path d="M18.8 33.2L9.7 24l9.2-9.2L16 12 4 24l12 12 2.8-2.8zm10.4 0l9.2-9.2-9.2-9.2L32 12l12 12-12 12-2.8-2.8z"/>
        </svg>
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        <svg class="h-4 w-4 ml-2" viewBox="0 0 1792 1792"  xmlns="http://www.w3.org/2000/svg">
          <path d="M553 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z"/>
        </svg>
      </button>

    </div>
    <editor-content class="pt-4" @focusout="onInputChange" :editor="editor" />

  </div>
</template>
<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { defaultExtensions } from '@tiptap/starter-kit'
import {defineComponent,watch,onMounted, onBeforeUnmount} from "vue"

export default defineComponent({
  name:"Tiptap",
  components:{EditorContent},
  emits:["contentChanged"],
  props:{
    canEdit:{
      type:Boolean,
      defautl:false
    },
    content:{
      type:String,
      defautl: ""
    }
  },
  setup(props,context){
    const editor = useEditor({
      content: props.content,
      extensions: defaultExtensions(),
      editable:true
    })

    const onInputChange = () => context.emit('contentChanged',editor.value.getHTML())


    return {editor,onInputChange}
  }
})
</script>
<style scoped>

.ProseMirror .ProseMirror-focused{
  outline: none !important;
  border: none !important;
}
button .is-active{
  color:white;
  background-color: black;
}
ul,
ol {
  padding: 0 1rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
}
code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
}
img {
  max-width: 100%;
  height: auto;
}
blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(#0D0D0D, 0.1);
}

hr {
  border: none;
  border-top: 2px solid rgba(#0D0D0D, 0.1);
  margin: 2rem 0;
}
</style>
