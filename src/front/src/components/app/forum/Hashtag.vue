<template>
    <div class=" bg-gray-50 rounded-md">
        <div class="flex justify-between items-center px-4 py-1">
            <h2 class=" mb-0 text-gray-600">Hashtags</h2>
            <button class=" text-gray-400 hover:text-blue-400 outline-none focus:outline-none">
                 <svg class=" stroke-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17.651 17.651">
                <g id="closeico" transform="translate(1480.614 33.501)">
                    <path id="path1419" d="M-1479.2-17.264l14.822-14.822" transform="translate(0 -0.001)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    <path id="path1421" d="M-1479.2-32.087l14.822,14.822" transform="translate(0)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </g>
            </svg>
            </button>
        </div>
        <horizontal-line />
        <div class="flex flex-wrap space-x-1 space-y-1 px-4 py-2">
            <closable-hashtag v-for="item in [...Array(2).keys()]" title="java" :key="item"/>
             <closable-hashtag v-for="item in [...Array(3).keys()]" title="microservices" :key="item"/>
              <closable-hashtag v-for="item in [...Array(2).keys()]" title="spring" :key="item"/>
        </div>
    </div>
</template>
<script>
    import HorizontalLine from '../HorizontalLine.vue'
    import ClosableHashtag from './HashTagClosable.vue'

    export default {
        name: "HashTag",
        components: { HorizontalLine, ClosableHashtag }
    }
</script>
