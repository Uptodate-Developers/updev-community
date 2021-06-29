<template>
  <a
    class="button-social"
    :page-url="page_url"
    :title="title_social"
    @click.prevent="showShareWindow"
  >
    <img class="h-12" src="../icons/linkedin_50px.png" alt="Linkedin" />
  </a>
</template>

<script>
import { clickEvent } from "../helpers/events";
import { documentHref } from "../helpers/href";
import { documentTitle } from "../helpers/title";
import { metaDescription } from "../helpers/description";
import { getCallbackName } from "../helpers/callback_name";
import { sliceThousandInt } from "../helpers/count_number";
import { openPopUpWindow } from "../helpers/popup_window";

export default {
  name: "VueGoodshareLinkedIn",
  props: {
    page_url: {
      type: String,
      default: documentHref,
    },
    page_title: {
      type: String,
      default: documentTitle,
    },
    page_description: {
      type: String,
      default: metaDescription,
    },
    title_social: String,
  },
  data() {
    return {
      counter_linkedin: 0,
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
      const share_url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        this.$props.page_url
      )}&text=${encodeURIComponent(
        this.$props.page_title
      )}&summary=${encodeURIComponent(this.$props.page_description)}&mini=true`;

      // onClick event
      clickEvent(this, "linkedin");

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
      script.src = `https://www.linkedin.com/countserv/count/share?url=${encodeURIComponent(
        this.$props.page_url
      )}&callback=${callback}`;

      // Add `script` tag with share count URL
      // to end of `body` tag
      document.body.appendChild(script);

      // Set share count to `counter_linkedin` v-model
      window[callback] = (count) => {
        if (count) {
          this.counter_linkedin =
            count.count >= 1000 ? sliceThousandInt(count.count) : count.count;
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
