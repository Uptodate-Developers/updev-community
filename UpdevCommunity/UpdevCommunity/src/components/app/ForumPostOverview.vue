<template>
    <div class="px-4 py-2 bg-gray-50">
        <h1 class=" text-gray-800">Comment résoudre l'erreur InvalidOperationException en Java?</h1>
        <p class=" text-gray-500">Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna ali Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.....</p>
        <div class=" flex justify-between items-center">
            <a-avatar :style="{backgroundColor: '#9C9C9C',verticalAlign: 'middle'}" :size="35"><span style="line-height: 35px" class="block text-sm font-semibold">JM</span></a-avatar>
            <div class=" flex space-x-4">
                <div class=" flex items-center space-x-1">
                    <img src="../../assets/icons/upvoteTopic.svg" alt="Upvote" />
                    <h3 class=" mb-0 font-normal">20</h3>
                </div>
                <div class=" flex items-center space-x-1">
                    <img src="../../assets/icons/comment.svg" alt="Comment" />
                    <h3 class=" mb-0 font-normal">200</h3>
                </div>
                <div class=" flex items-center space-x-1">
                    <img src="../../assets/icons/view.svg" alt="Comment" />
                    <h3 class=" mb-0 font-normal">400</h3>
                </div>
            </div>
        </div>
        <horizontal-line class="mt-2" />
    </div>
</template>
<script>
    import HorizontalLine from './HorizontalLine.vue'

    export default {
        name: "ForumPostOverview",
        components: { HorizontalLine }
    }


</script>
