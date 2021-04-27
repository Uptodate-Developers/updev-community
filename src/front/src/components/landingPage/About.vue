<template>
    <div id="about">
        <div class="bg-gray-100 mt-8 px-4 py-6 md:pb-24">
            <div class="md:container mx-auto">
                <div class="flex flex-col items-center  pb-5 space-y-1">
                    <h1 class=" text-xl font-medium">Qu'est ce qu' <span class=" text-blue-600">Updev Community</span>?</h1>
                    <div style="height:2px" class="w-40  bg-blue-300 rounded-lg" />
                </div>
                <p class=" max-w-3xl mx-auto text-gray-600 text-lg text-center py-5">
                  Updev Community est un espace des développeurs où vous pouvez poser et/ou répondre à des questions entre développeurs.
                </p>

                <div class="mt-5 grid md:grid-cols-3 gap-3">
                    <about-card v-for="about in abouts" :key="about.title" :title="about.title" :description="about.description" :iconLink="about.iconLink" />
                </div>
            </div>
        </div>
    </div>
   
</template>
<script>
import AboutCard from './AboutCard.vue'
import devspaceImg from '../../assets/icons/devspace.svg'
import forumdiscussionImg from '../../assets/icons/forumdiscussion.svg'
import solutionImg from '../../assets/icons/solution.svg'

export default {
    name:"About",
    components:{AboutCard},
    data(){
        return {
            abouts:[
                {title:"Espace des développeurs",description:"Communauté de développeurs, pour les développeurs et par les développeurs.",iconLink:devspaceImg},
                {title:"Forum de disccussion",description:"Lieu de partage sur différentes thématiques de l'informatique.",iconLink:forumdiscussionImg},
                {title:"Solution",description:"Déposez vos questions informatiques dans la boîte à solution Updev Community et trouvez-y des réponses.",iconLink:solutionImg},
      ]
    };
    }
}
</script>
