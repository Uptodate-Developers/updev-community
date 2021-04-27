<template>
    <div class=" bg-gray-50">
        <div class="py-1.5 px-4 bg-blue-500 h-10 -mb-5">
           
        </div>
        <div class="ml-4">
            <a-avatar :src="user.profilePicUrl" class="border-2 border-gray-100"  :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="50"><span style="line-height: 50px" class="block text-xl font-semibold">{{avatar}}</span></a-avatar>
        </div> 
        <div class="px-4 py-2" >
            <h2 class=" mb-0 text-md font-semibold">{{fullName}}</h2>
            <h3 class=" my-1 text-xs text-gray-500">{{user.profession}}</h3>
            <p class=" text-sm text-gray-500" >{{user.bio}}</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue"
import {User} from "../../../api/models/User"
export default defineComponent({
  props:{
    user: {
      type: Object as () => User,
      required: true
    }
  },
  setup({user}){

    const fullName = computed(() => `${user.name} ${user.firstName} ${user.lastName}`);
    const avatar = computed(()=> `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`);

    return {fullName, avatar}
  }
})
</script>
