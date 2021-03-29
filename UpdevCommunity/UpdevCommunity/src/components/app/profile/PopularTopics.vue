<template>
    <div class=" relative mb-72">
        <div class="py-1.5 px-4 bg-blue-500">
            <h2 class=" mb-0 text-gray-50">Topics populaires</h2>
        </div>
        <div >
            <forum-post-overview v-for="item in [...Array(7).keys()]" :key="item" />
        </div>
    </div>
</template>
<script>
import ForumPostOverview from '../ForumPostOverview.vue'

export default{
    name:"PopularTopics",
    components:{ForumPostOverview}
}
</script>
