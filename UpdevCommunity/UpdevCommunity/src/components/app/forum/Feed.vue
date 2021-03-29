<template>
<div class=" space-y-1">
     <new-post />
    <not-connected class="md:hidden" />
    <hash-tags class="md:hidden" />
    <forum-post />
    <forum-post openComment="true" />
    <forum-post openDetailComment="true" />
    <forum-post openDetailComment="true" showImages="true" />
    <forum-post />
    <forum-post openComment="true" />
    <forum-post openDetailComment="true" />
    <forum-post openDetailComment="true" showImages="true" />
</div>
</template>
<script>
    import NewPost from './NewPost.vue'
    import NotConnected from '../NotConnected.vue'
    import HashTags from './Hashtag.vue'
    import ForumPost from '../ForumPost.vue'
    export default {
        name: "Feed",
        components: { NewPost, NotConnected, HashTags, ForumPost }
    }
</script>
