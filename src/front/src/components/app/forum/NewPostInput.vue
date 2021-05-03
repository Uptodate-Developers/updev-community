<template>

  <div>
    <button @click="newPostEdit = !newPostEdit" class=" flex-col justify-center py-2 bg-transparent border rounded-lg px-5 w-full focus:outline-none ">
      <input class=" bg-transparent focus:outline-none" placeholder="Que voulez-vous poster?"/>
    </button>
    <new-post-editor :user="user" :openEditor="newPostEdit"/>
    <button @click="newPostEdit = !newPostEdit" class="md:hidden md:h-0 md:w-0 bg-blue-500 fixed bottom-5 right-2.5 h-12 w-12 z-50 text-gray-50 flex justify-center items-center rounded-3xl focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  </div>

</template>
<script lang="ts">
import {defineComponent, ref} from "vue"
import {User} from "../../../../api/models/User"
import NewPostEditor from "./NewPostEditor.vue"

export default defineComponent({
  name:"NewPostInput",
  components:{NewPostEditor},
  props:{
    user:{
      type: Object as () => User,
      required: true
    }
  },
  setup({user}) {
    const newPostEdit = ref(false)

    return{newPostEdit}
  }
})
</script>
