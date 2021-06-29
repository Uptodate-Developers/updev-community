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
import { metaDescription } from "../helpers/description";

export default {
  name: "VueGoodshareTwitter",
  props: {
    page_url: {
      type: String,
      default: documentHref,
    },
    title_social: String,
    page_title: {
      type: String,
      default: documentTitle,
    },
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
