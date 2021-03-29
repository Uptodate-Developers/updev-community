<template>
    <div class=" bg-gray-50 px-2 py-2 rounded-md flex flex-col  items-stretch">
        <div class=" flex items-center space-x-2">
                <a-avatar :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="50"><span style="line-height: 50px" class="block text-xl font-semibold">JM</span></a-avatar>
                <div>
                    <h2 class="mb-0">Julius Nyerere</h2>
                </div>
        </div>
    
        <new-post-input class=" self-stretch"/>
    </div>
</template>
<script>
import NewPostInput from '../NewPostInput.vue'

export default{
    name:"NewPost",
    components: {NewPostInput}
}

</script>
