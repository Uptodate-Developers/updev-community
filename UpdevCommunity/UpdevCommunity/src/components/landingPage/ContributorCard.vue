<template>
     <div class=" bg-gray-50 flex space-x-2 items-center px-4 py-1 w-96 " >
        <a-avatar style="z-index:20" :size="70">{{avatarName}}</a-avatar>
        <div >
            <h2 class=" text-gray-900">{{names}}</h2>
            <h3 class=" text-gray-400">{{gitUsername}}</h3>
            <p class=" text-gray-500">{{roles}}</p>
        </div>
    </div>
</template>
<script>
export default{
    name:"ContributorCard",
    props:{
        names:String,
        gitUsername:String,
        avatarName:String,
        avatarLink:String,
        roles:String
    }
}
</script>