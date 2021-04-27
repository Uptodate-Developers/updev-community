<template>
    <div >
        <h3 class=" text-xs px-2">Aujourd'hui</h3>
        <div class=" space-y-0.5">
            <notification-card v-for="item in [...Array(2).keys()]" :key="item" isNew="true"/>
        </div>
         <h3 class=" text-xs px-2">Hier</h3>
        <div class=" space-y-0.5">
            <notification-card v-for="item in [...Array(4).keys()]" :key="item"/>
        </div>
         <h3 class=" text-xs px-2">20/09/2020</h3>
        <div class=" space-y-0.5">
            <notification-card v-for="item in [...Array(6).keys()]" :key="item"/>
        </div>
        <h3 class=" text-xs px-2">20/09/2020</h3>
        <div class=" space-y-0.5">
            <notification-card v-for="item in [...Array(10).keys()]" :key="item"/>
        </div>
    </div>
</template>
<script>
import NotificationCard from './NotificationCard.vue'

export default{
    name:'Notifications',
    components:{NotificationCard}
}
</script>
