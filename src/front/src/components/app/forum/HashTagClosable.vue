<template>

    <div class=" bg-blue-500 rounded-xl py-1 flex items-center justify-around space-x-2 px-1.5">
        <h3 class="mb-0 text-xs text-gray-50 self-center">#{{title}}</h3>
        <button class=" text-gray-50 hover:text-gray-300 focus:outline-none">
            <svg class=" stroke-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17.651 17.651">
                <g id="closeico" transform="translate(1480.614 33.501)">
                    <path id="path1419" d="M-1479.2-17.264l14.822-14.822" transform="translate(0 -0.001)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    <path id="path1421" d="M-1479.2-32.087l14.822,14.822" transform="translate(0)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </g>
            </svg>
        </button>
    </div>
</template>
<script>
    export default{
        name:"HashtagClosable",
        components:{},
        props:{
            title:String
        }
    }
</script>
