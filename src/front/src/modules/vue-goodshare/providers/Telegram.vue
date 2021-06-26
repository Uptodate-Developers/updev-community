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

export default {
  name: "VueGoodshareTelegram",
  props: {
    page_url: {
      type: String,
      default: documentHrefWithoutHash,
    },
    button_design: {
      type: String,
      default: () => "flat",
    },
    title_social: String,
    has_icon: Boolean,
    has_square_edges: Boolean,
  },
  data() {
    return {
      buttonSocialDesignObject: {
        "button-social__square_edges": this.$props.has_square_edges,
        telegram__design__flat: this.$props.button_design === "flat",
        telegram__design__gradient: this.$props.button_design === "gradient",
        telegram__design__outline: this.$props.button_design === "outline",
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
