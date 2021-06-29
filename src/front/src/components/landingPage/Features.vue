<template>
  <div id="features">
    <div class="px-4 py-5">
      <div class="">
        <div class="flex flex-col items-center pb-3 space-y-1">
          <h1 class="text-xl font-medium">Fonctionnalités</h1>
          <div style="height: 2px" class="w-20 bg-blue-300 rounded-lg" />
        </div>

        <div>
          <div class="md:flex md:items-center md:justify-center">
            <feature-item
              v-for="feature in features"
              :key="feature.title"
              :title="feature.title"
              :iconLink="feature.titleIcon"
            />
          </div>
          <div class="py-3 px-4">
            <a-carousel autoplay afterChange="indexChanged">
              <feature-details
                v-for="feature in features"
                :key="feature.title"
                :details="feature.details"
                :iconLink="feature.detailsImg"
              />
            </a-carousel>
          </div>
        </div>
        <button
          class="
            block
            mx-auto
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
          @click="$router.push('/app')"
        >
          Créer une discussion
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import FeatureItem from "./FeatureItem.vue";
import FeatureDetails from "./FeatureDetails.vue";
import topicImg from "../../assets/icons/topic.svg";
import replyImg from "../../assets/icons/reply.svg";
import voteDoneImg from "../../assets/icons/votedone.svg";
import shareImg from "../../assets/icons/share.svg";
import createTopicImg from "../../assets/icons/createTopic.svg";
import respondImg from "../../assets/icons/respond.svg";
import upvoteImg from "../../assets/icons/upvote.svg";
import shareonlineImg from "../../assets/icons/shareonline.svg";

export default {
  name: "Features",
  components: { FeatureItem, FeatureDetails },
  data() {
    return {
      slideIndex: 0,
      features: [
        {
          title: "Créer un sujet de discussion",
          titleIcon: topicImg,
          details:
            "Vous avez une question? Vous voulez avoir une opinion sur l'expérience des autres? Si oui, créer un sujet de discussion dans le forum.",
          detailsImg: createTopicImg,
        },
        {
          title: "Participer à une discussion",
          titleIcon: replyImg,
          details:
            "Partager votre expérience ou opinion en placant votre commentaire sur un sujet. Soit repondez aux questions des membre de la communeauté.",
          detailsImg: respondImg,
        },
        {
          title: "Voter les discussions",
          titleIcon: voteDoneImg,
          details:
            "Voter ou commenter les discussions qui vous ont le plus aidé.",
          detailsImg: upvoteImg,
        },
        {
          title: "Partager un sujet de discussion",
          titleIcon: shareImg,
          details:
            "Partager les discussions sur les réseaux sociaux ou sur la toile en général pour que les autres en profite.",
          detailsImg: shareonlineImg,
        },
      ],
    };
  },
  methods: {
    indexChanged(event) {
      console.log(event);
    },
  },
};
</script>
