<template>
  <a
    class="button-social"
    :page-url="page_url"
    :title="title_social"
    @click.prevent="showShareWindow"
  >
    <img class="h-12" src="../icons/telegram_50px.png" alt="Telegram" />
  </a>
</template>

<script>
import { clickEvent } from "../helpers/events";
import { documentHrefWithoutHash } from "../helpers/href";
import { openPopUpWindow } from "../helpers/popup_window";
import { documentTitle } from "../helpers/title";
import { metaDescription } from "../helpers/description";

export default {
  name: "VueGoodshareTelegram",
  props: {
    page_url: {
      type: String,
      default: documentHrefWithoutHash,
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
      const share_url = `https://telegram.me/share/url?url=${encodeURIComponent(
        this.$props.page_url
      )}`;

      // onClick event
      clickEvent(this, "telegram");

      return openPopUpWindow(share_url, width, height);
    },
  },
};
</script>
