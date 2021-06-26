<template>
  <a
    class="button-social"
    :page-url="page_url"
    :title="title_social"
    @click.prevent="showShareWindow"
  >
    <img class="h-12" src="../icons/twitter_50px.png" alt="twitter" />
  </a>
</template>

<script>
import { clickEvent } from "../helpers/events";
import { documentHref } from "../helpers/href";
import { documentTitle } from "../helpers/title";
import { openPopUpWindow } from "../helpers/popup_window";

export default {
  name: "VueGoodshareTwitter",
  props: {
    page_url: {
      type: String,
      default: documentHref,
    },
    title_social: String,
  },
  data() {
    return {
      buttonSocialDesignObject: {
        "button-social__square_edges": this.$props.has_square_edges,
        twitter__design__flat: this.$props.button_design === "flat",
        twitter__design__gradient: this.$props.button_design === "gradient",
        twitter__design__outline: this.$props.button_design === "outline",
      },
    };
  },
  methods: {
    /**
     * Show share window.
     *
     * @return {object} a pop-up window
     */
    showShareWindow: function () {
      // Variables
      const width = 640;
      const height = 480;
      const share_url = `https://twitter.com/share?url=${encodeURIComponent(
        this.$props.page_url
      )}&text=${encodeURIComponent(this.$props.page_title)}`;

      // onClick event
      clickEvent(this, "twitter");

      return openPopUpWindow(share_url, width, height);
    },
  },
};
</script>
