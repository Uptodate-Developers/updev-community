<template>
    <div class="md:hidden" >
        <a-tabs class=" bg-gray-50" default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="Forum">
                <div class=" bg-gray-200 space-y-1 -mt-4 px-1 py-1">
                    <feed/>
                </div>

            </a-tab-pane>
            <a-tab-pane key="2" tab="Tendances" force-render>
                <div class=" bg-gray-200 space-y-1 -mt-4 px-1 py-1">
                    <popular-topics/>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Hashtags" force-render>
                <div class=" bg-gray-200 space-y-1 -mt-4 px-1 py-1">
                    <side-hasg-tags/>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
    <div class="hidden container mx-auto md:grid grid-cols-9 gap-1 py-2 xl:px-28">
        <div class="col-span-2 md:sticky top-16 h-screen z-20 space-y-1 overflow-y-auto hiddescrollbar">
            <connected/>
            <not-connected/>
            <side-hasg-tags/>
        </div>
        <div class=" col-span-4">
            <feed/>
        </div>
        <div class=" col-span-3 md:sticky top-16 h-screen z-20 overflow-y-auto hiddescrollbar">
            <popular-topics/>
        </div>
    </div>
</template>
<script>
import Feed from '../components/app/forum/Feed.vue'
 import NotConnected from '../components/app/NotConnected.vue'
 import PopularTopics from '../components/app/profile/PopularTopics.vue'
 import SideHasgTags from '../components/app/forum/SideHashtags.vue'
 import Connected from '../components/app/Connected.vue'

export default{
    name:"AppHome",
    components:{Feed, NotConnected,PopularTopics,SideHasgTags, Connected}
}

</script>
<style scoped>
.hiddescrollbar::-webkit-scrollbar {
    display: none;
}
</style>
