<template>
    <div class=" hidden container mx-auto md:grid grid-cols-3 gap-1 my-2 xl:px-28">
        <div class="col-span-2 space-y-1">
            <user-vue />
            <user-journal />
        </div>
        <div >
            <div  class="space-y-1 md:sticky top-16 h-screen z-20">
                <high-lights />
                <popular-topics />
            </div>
        </div>
    </div>
    <div class="md:hidden space-y-1">
        <user-vue />
        <high-lights />
        <user-journal />
        <popular-topics />
    </div>
</template>
<script>
    import HighLights from '../components/app/profile/HighLights.vue'
    import UserVue from '../components/app/profile/User.vue'
    import UserJournal from '../components/app/profile/UserJournal.vue'
    import PopularTopics from '../components/app/profile/PopularTopics.vue'

    export default {
        name: "Profile",
        components: { UserVue, HighLights, UserJournal, PopularTopics }
    }

</script>
