<template>
  <div class="bg-gray-50">
    <div class="flex justify-between items-center px-4 py-1">
      <h2 class="mb-0 text-gray-600">Grandes lignes</h2>
      <button
        class="hidden text-gray-400 hover:text-blue-400 outline-none focus:outline-none"
      >
        <svg
          class="h-5 fill-current hover:text-blue-400"
          id="edit"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 29.201 29.2"
        >
          <g id="Group_64" data-name="Group 64">
            <g
              id="Group_60"
              data-name="Group 60"
              transform="translate(0 2.433)"
            >
              <path
                id="Path_158"
                data-name="Path 158"
                d="M22.508,30.767H0V4H17.642a.608.608,0,0,1,0,1.217H1.217V29.55H21.292V16.167a.608.608,0,0,1,1.217,0Z"
                transform="translate(0 -4)"
              />
            </g>
            <g
              id="Group_61"
              data-name="Group 61"
              transform="translate(13.383 10.342)"
            >
              <path
                id="Path_159"
                data-name="Path 159"
                d="M22,17"
                transform="translate(-22 -17)"
                fill="#afafaf"
              />
            </g>
            <g id="Group_62" data-name="Group 62" transform="translate(12.554)">
              <path
                id="Path_160"
                data-name="Path 160"
                d="M21.245,16.646a.609.609,0,0,1-.545-.88l1.72-3.441a.6.6,0,0,1,.114-.158L34.15.552A1.775,1.775,0,0,1,35.42,0a1.905,1.905,0,0,1,1.726,1.186,1.743,1.743,0,0,1-.415,1.946L25.116,14.747a.625.625,0,0,1-.158.114l-3.441,1.721A.607.607,0,0,1,21.245,16.646Zm2.22-3.69-.86,1.721,1.721-.861L35.871,2.272a.536.536,0,0,0,.152-.621.707.707,0,0,0-.6-.435.582.582,0,0,0-.411.2Z"
                transform="translate(-20.636)"
              />
            </g>
            <g
              id="Group_63"
              data-name="Group 63"
              transform="translate(24.168 2.094)"
            >
              <path
                id="Path_161"
                data-name="Path 161"
                d="M42.058,6.379a.609.609,0,0,1-.431-.178L39.906,4.48a.609.609,0,0,1,.861-.861l1.72,1.721a.609.609,0,0,1-.43,1.039Z"
                transform="translate(-39.729 -3.441)"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
    <horizontal-line />
    <div class="flex items-center space-x-4 px-4 py-2">
      <img src="../../../assets/icons/calendar.svg" alt="Calender icon" />
      <h3 class="mb-0 text-gray-600">A rejoins {{ joinDate }}</h3>
    </div>
    <div class="flex items-center space-x-4 px-4 py-2">
      <img src="../../../assets/icons/topic.svg" width="27" alt="Posts icon" />
      <h3 title="Nombre des publications" class="mb-0 text-gray-600">
        Publications ({{ postsCount }})
      </h3>
    </div>
  </div>
</template>
<script lang="ts">
import HorizontalLine from "../HorizontalLine.vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { defineComponent, ref } from "vue";
import { User } from "../../../../api/models/User";

dayjs.extend(utc);

export default defineComponent({
  name: "HighLight",
  components: { HorizontalLine },
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  setup({ user }) {
    const joinDate = ref(
      `${dayjs(user.dateCreated).local().format("MMMM YYYY")}`
    );
    const postsCount = ref(user.postsCount || 0);

    return { joinDate, postsCount };
  },
});
</script>
