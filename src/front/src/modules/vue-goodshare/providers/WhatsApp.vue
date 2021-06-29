<template>
  <a
    class="button-social"
    :page-url="page_url"
    :title="title_social"
    @click.prevent="showShareWindow"
  >
    <img class="h-12" src="../icons/whatsapp_50px.png" alt="whatsapp" />
  </a>
</template>

<script>
import { clickEvent } from "../helpers/events";
import { documentHref } from "../helpers/href";
import { openPopUpWindow } from "../helpers/popup_window";
import { documentTitle } from "../helpers/title";
import { metaDescription } from "../helpers/description";

export default {
  name: "VueGoodshareWhatsapp",
  props: {
    page_url: {
      type: String,
      default: documentHref,
    },
    title_social: String,
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
      const share_url = `https://wa.me?text=${encodeURIComponent(
        this.$props.page_url
      )}`;

      // onClick event
      clickEvent(this, "whatsapp");

      return openPopUpWindow(share_url, width, height);
    },
  },
};
</script>
