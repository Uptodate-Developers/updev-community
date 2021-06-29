<template>
  <div class="mb-3 base-image-picker">
    <div :id="uuid" :style="placeHolderStyle" class="image-upload-box">
      <div class="overlay" :class="{ visible: processing }">
        <a-spin v-if="processing" :indicator="indicator" />
      </div>
      <img v-if="selectedFile" :src="selectedFile" class="preview-logo" />
      <div v-else class="upload-content">
        <i class="fa fa-cloud-upload upload-icon" />
        <p class="upload-text">{{ label }}</p>
      </div>
    </div>
    <avatar-cropper
      :labels="{ submit: 'Valider', cancel: 'Annuler' }"
      :cropper-options="cropperOptions"
      :output-options="cropperOutputOptions"
      :output-quality="0.8"
      :upload-handler="cropperHandler"
      :trigger="`#${uuid}`"
      ref="cropper"
      @changed="setFileObject"
      @error="handleUploadError"
    />
  </div>
</template>
<script lang="ts">
import Cropper from "cropperjs";
import AvatarCropper from "./../../modules/vue-avatar-cropper";
import { dataURLtoFile, randomChar } from "./../../utils/str-utils";
import {
  h,
  defineComponent,
  onMounted,
  watch,
  ref,
  computed,
  reactive,
} from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "BaseImagePicker",
  components: { AvatarCropper },
  emits: ["fileSelected"],
  props: {
    value: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
      default: "auto",
    },
    name: {
      type: String,
      required: true,
    },
    processing: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      default: "Cliquez içi pour choisir une image",
    },
  },
  setup(props, { emit }) {
    const uuid = randomChar(12);
    const processing = ref<boolean>(false);
    const selectedFile = ref<string>(props.value);
    const fileName = ref<string>("");

    const cropperOptions = {
      autoCropArea: 1,
      viewMode: 0,
      movable: true,
      zoomable: true,
    };

    const cropperOutputOptions = {
      width: 150,
      height: 150,
    };

    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: "24px",
      },
      spin: true,
    });

    const cropperHandler = (cropper: Cropper): void => {
      const fileBase64 = cropper.getCroppedCanvas().toDataURL();
      selectedFile.value = fileBase64;

      emit("fileSelected", dataURLtoFile(fileBase64, fileName.value));
    };

    const handleUploadError = (message: string, type: string): void => {
      console.log(message, type);
    };

    const setFileObject = (file: File): void => {
      if (file) {
        fileName.value = file.name;
      }
    };

    const placeHolderStyle = computed(() => {
      const width = props.width;
      if (width !== "auto") {
        return { width: `${width}px`, height: `${width}px` };
      }
      return {};
    });

    const toggleOverlay = (val: boolean): void => {
      processing.value = val;
    };

    watch(() => props.processing, toggleOverlay);

    return {
      uuid,
      indicator,
      processing,
      selectedFile,
      setFileObject,
      cropperOptions,
      cropperHandler,
      placeHolderStyle,
      handleUploadError,
      cropperOutputOptions,
    };
  },
});
</script>
<style src="./scss/image-picker.scss" lang="scss" scoped></style>
