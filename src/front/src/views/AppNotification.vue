<template>
        <div class="md:hidden" >
            <notifications/>
        </div>
    <div class="hidden container mx-auto md:grid grid-cols-9 gap-2 py-2 xl:px-28">
        <div class="col-span-2 md:sticky top-16 h-screen z-20 space-y-1 overflow-y-auto hiddescrollbar">
            <connected :user="user" v-if="isAuthenticated"/>
            <not-connected v-if="!isAuthenticated"/>
            <side-hasg-tags/>
        </div>
        <div class=" col-span-4">
            <notifications/>
        </div>
        <div class=" col-span-3 md:sticky top-16 h-screen z-20 overflow-y-auto hiddescrollbar">
            <popular-topics :user="user"/>
        </div>
    </div>
</template>
<script>
 import Notifications from '../components/app/notification/Notifications.vue'
 import NotConnected from '../components/app/NotConnected.vue'
 import PopularTopics from '../components/app/PopularTopics.vue'
 import SideHasgTags from '../components/app/forum/SideHashtags.vue'
 import Connected from '../components/app/Connected.vue'
 import { defineComponent, ref,reactive} from "vue"
 import {AuthService} from "../services/AuthService";

 export default defineComponent({
   name:"AppNotification",
   components:{Notifications, NotConnected,PopularTopics,SideHasgTags, Connected, Notification},
   setup(){
     const authService = new AuthService();
     const user = reactive(authService.user);
     const isAuthenticated = ref(authService.isAuthenticated);

     return{user,isAuthenticated};
   }
 })
</script>
<style scoped>
.hiddescrollbar::-webkit-scrollbar {
    display: none;
}
</style>

