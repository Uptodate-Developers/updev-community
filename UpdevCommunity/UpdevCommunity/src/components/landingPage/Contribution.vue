<template>
    <div id="contribute">
        <div class=" bg-blue-100 px-4 py-4">
            <div class="container mx-auto">
                <div class="flex flex-col items-center   space-y-1">
                    <h1 class=" text-xl font-medium">Contributions</h1>
                    <div style="height:2px" class="w-20  bg-blue-300 rounded-lg" />
                </div>
                <p class=" max-w-3xl mx-auto text-gray-600 text-lg text-center py-5">
                    UpdevCommunity est possible grace à la contributions de ses members. Merci à tous ceux qui participe au development de la communauté.
                </p>
                <div>
                    <div class="flex flex-col items-center">
                        <div class="space-y-1">
                            <contributor-card v-for="contributor in contributors" :key="contributor.names" :names="contributor.names" :avatarName="contributor.avatarName" :roles="contributor.roles" :gitUsername="contributor.gitUsername" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mx-auto py-5 px-4 md:flex items-center lg:space-x-3">
                <div>
                    <h2 class=" text-md font-medium">Voulez vous contribuer ?</h2>
                    <p class="max-w-3xl md:max-w-md lg:max-w-3xl   text-gray-600 text-md  py-1">
                        Si vous remarquez une fonctionalité qui manque, une erreur ou vous avez une idée qui puisse ameliorer la communauté.
                    </p>
                </div>

                <button class="block font-semibold  text-gray-50 bg-blue-500 px-10 py-3 rounded-md shadow">
                    Rejoignez nous sur Github
                </button>
            </div>
        </div>
    </div>
  
</template>
<script>
    import ContributorCard from './ContributorCard.vue'

    export default{
        name:"Contribution",
        components:{ContributorCard},
        data() {
            return {
                contributors:[
                    {names:"Jospeh Kalema", gitUsername:"@berna39",roles:"lead maintainer,devops",avatarName:"JK"},
                    {names:"Jack Mutobu", gitUsername:"@mutobujack",roles:"developer",avatarName:"JM"}
            ]
        };
     },
}
</script>

