<template>
     <div class=" bg-gray-50">
    <a-tabs  default-active-key="1" @change="callback">
      <a-tab-pane  key="1" tab="Posts">
        <div  class=" bg-gray-200 space-y-1 -mt-4 px-1 py-1">
          <forum-post v-for="item in [...Array(5).keys()]" :key="item"/>
        </div>
        
      </a-tab-pane>
      <a-tab-pane key="2" tab="Réponses" force-render>
         <div  class=" bg-gray-200 space-y-1 -mt-4 px-1 py-1">
           <forum-response v-for="item in [...Array(5).keys()]" :key="item"/>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import ForumPost from '../ForumPost.vue'
import ForumResponse from '../ForumResponse.vue'

export default{
  name:"UserJournal",
  components:{ForumPost, ForumResponse}
}

</script>

