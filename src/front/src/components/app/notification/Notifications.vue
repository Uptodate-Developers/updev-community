<template>
    <div v-if="user" v-for="subnotifications in notifications" :key="subnotifications" >
      <h3 class=" text-xs px-2">{{subnotifications[0].post.datePosted}}</h3>
      <div v-for="notif in subnotifications" :key="notif" class="space-y-1">
        <a @click="goToPost(notif.post.id)">
          <notification-card class="my-1" :notif="notif" />
        </a>
      </div>
    </div>
</template>
<script lang="ts">
import NotificationCard from './NotificationCard.vue'
import {defineComponent,onMounted,ref} from "vue"
import {AuthService,NotificationService} from "../../../services"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import {message} from "ant-design-vue"
import {useRouter} from "vue-router"

dayjs.extend(utc)
export default defineComponent({
  name:'Notifications',
  components:{NotificationCard},
  setup(){
    const authService = new AuthService()
    const notificationService = new NotificationService()
    const user = ref(authService.user)
    const notifications = ref([])
    const skip = ref(0)
    const take = ref(20)
    const router = useRouter()
    const onGetNotifications = async () => {
      if(user.value){
        const notifResponse = await notificationService.getNotifications(user.value.id,skip.value,take.value)
        if(typeof notifResponse == "string"){
          message.error(notifResponse)
          return []
        }
        const notifs = groupBy(notifResponse,x => dayjs(x.date).toDate().getDate())
        return notifs.values()
      }
    }

      onMounted(async () => notifications.value = await onGetNotifications())
    const goToPost = (postId:string) => router.push(`/app/post/${postId}`)
        function groupBy(list, keyGetter) {
          const map = new Map();
          list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
              map.set(key, [item]);
            } else {
              collection.push(item);
            }
          });
          return map;
        }

    return{goToPost,user,notifications}
  }
})
</script>
