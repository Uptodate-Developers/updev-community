<template>
  <div id="home">
    <div
      class="
        md:container
        mx-auto
        space-y-8
        px-4
        pt-14
        lg:pt-24
        md:grid
        grid-cols-2
        gap-4
      "
    >
      <img
        class="h-60 md:h-80 mx-auto"
        src="../../assets/icons/community.svg"
        alt="Communauté"
      />
      <div class="flex flex-col justify-center">
        <h2 class="text-2xl font-medium text-gray-900">
          Trouvez des <span class="text-blue-500">réponses</span> à vos
          questions en programmation
        </h2>
        <p class="mt-2 text-gray-600">
          Updev Community est un forum d'échange et de partage des connaissances
          entre informaticiens, aussi bien débutants qu'experts dans le but
          d'améliorer les compétences des développeurs.
        </p>
        <p class="mt-2 text-gray-600">
          Posez vos questions sur le forum Updev Community et recevez des
          réponses adéquates, soit partagez votre connaissance en répondant aux
          questions.
        </p>
        <!-- <button >
                    Poser une question
                </button> -->
        <router-link
          to="/app"
          class="
            block
            mt-5
            self-start
            font-semibold
            text-center text-gray-50
            bg-blue-500
            px-10
            py-3
            rounded-md
            shadow
          "
        >
          Poser une question
        </router-link>
      </div>
    </div>
  </div>
</template>
