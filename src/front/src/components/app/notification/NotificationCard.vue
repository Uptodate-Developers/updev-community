<template>
    <div class=" bg-gray-50 px-2 py-1 flex items-center justify-around space-x-2">
      <a-avatar  :src="notif.reply.user.profilePicUrl" :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}"
                 :size="40"><span style="line-height: 40px" class="block text-xl font-semibold">{{ avatar }}</span>
      </a-avatar>
      <div >
        <h2>{{userNames}} <span class=" text-gray-500">a répondu à une publication</span></h2>
        <h3 class=" text-xs">{{notif.reply.body.substring(0,300)}}</h3>
      </div>
      <div  class="flex flex-col justify-center items-end space-y-2">
        <span class="mb-0 text-sm text-gray-400">{{time}}</span>
        <div v-if="isNew"  class="rounded-md h-2 w-2 bg-yellow-300"></div>
      </div>
    </div>
</template>
<script lang="ts">
import {computed, defineComponent, ref} from "vue"
import {NotificationResponse} from "../../../../api/responses"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export default defineComponent({
  name:"NotificationCard",
  props:{
    isNew:Boolean,
    notif:{
      type:Object as () => NotificationResponse
    }
  },
  setup(props){
    console.log(props.notif.reply.user)
    const userNames = ref(`${props.notif.reply.user.firstName} ${props.notif.reply.user.lastName}`)
    const postTitle = ref(`${props.notif.post.title}`)
    const avatar = computed(() => `${props.notif?.reply.user?.firstName?.charAt(0)}${props.notif.reply.user?.lastName?.charAt(0)}`)
    const time = ref( `${dayjs(props.notif.reply.datePosted).local().toDate().getHours()}h${dayjs(props.notif.reply.datePosted).local().toDate().getMinutes()}`)
    return {time,avatar,postTitle,userNames}
  }
})
</script>
