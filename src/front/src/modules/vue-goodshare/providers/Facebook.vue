<template>
  <a
    class="button-social"
    :page-url="page_url"
    :title="title_social"
    @click.prevent="showShareWindow"
  >
    <img class="h-12" src="../icons/facebook_50px.png" alt="facebook" />
  </a>
</template>

<script>
import { clickEvent } from "../helpers/events";
import { documentHrefWithoutHash } from "../helpers/href";
import { getCallbackName } from "../helpers/callback_name";
import { sliceThousandInt } from "../helpers/count_number";
import { openPopUpWindow } from "../helpers/popup_window";

export default {
  name: "VueGoodshareFacebook",
  props: {
    page_url: {
      type: String,
      default: documentHrefWithoutHash,
    },
    title_social: String,
  },
  data() {
    return {
      buttonSocialDesignObject: {
        "button-social__square_edges": this.$props.has_square_edges,
        facebook__design__flat: this.$props.button_design === "flat",
        facebook__design__gradient: this.$props.button_design === "gradient",
        facebook__design__outline: this.$props.button_design === "outline",
      },
      counter_facebook: 0,
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
      const share_url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.$props.page_url
      )}&description=${encodeURIComponent(
        this.$props.page_description
      )}&title=${encodeURIComponent(
        this.$props.page_title
      )}&quote=${encodeURIComponent(
        this.$props.quote
      )}&hashtag=${encodeURIComponent(this.$props.hashtag)}`;

      // onClick event
      clickEvent(this, "facebook");

      return openPopUpWindow(share_url, width, height);
    },

    /**
     * Get share counter.
     *
     * @return {object} a share counter
     */
    getShareCounter: function () {
      // Variables
      const script = document.createElement("script");
      const callback = getCallbackName("vue_goodshare", 9999, 111);

      // Create `script` tag with share count URL
      script.src = `https://graph.facebook.com?id=${encodeURIComponent(
        this.$props.page_url
      )}&callback=${callback}`;

      // Add `script` tag with share count URL
      // to end of `body` tag
      document.body.appendChild(script);

      // Set share count to `counter_facebook` v-model
      window[callback] = (count) => {
        if (count.share) {
          this.counter_facebook =
            count.share.share_count >= 1000
              ? sliceThousandInt(count.share.share_count)
              : count.share.share_count;
        }
      };
    },
  },
  mounted() {
    // Show share counter when page loaded
    if (this.$props.has_counter) this.getShareCounter();
  },
};
</script>
