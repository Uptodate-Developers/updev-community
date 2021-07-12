<template>
  <a-modal
    title="Créer un post"
    :visible="newPostEdit"
    @cancel="newPostEdit = false"
    cancelText="Annuler"
    okText="Publier"
    @ok="uploadPost"
    :confirmLoading="isLoading"
  >
    <div class="-mx-4 -mt-4">
      <a-input v-model:value="title" placeholder="Titre" />
    </div>
    <div class="-mx-4">
      <editor
        :key="`editor-${editorUuid}`"
        @contentChanged="onContentChanged"
      />
    </div>
    <div class="space-y-2 -mx-4">
      <div>
        <a-mentions
          v-model:value="hashtags"
          placeholder="# pour ajouter un hashtag"
          :prefix="['#']"
          @search="onSearch"
        >
          <a-mentions-option
            v-for="value in options"
            :key="value"
            :value="value"
          >
            {{ value }}
          </a-mentions-option>
        </a-mentions>
      </div>
      <div>
        <a-upload
          accept=".jpg, .jpeg, .png,.gif"
          list-type="picture"
          v-model:file-list="fileList"
          :key="`uploader-${editorUuid}`"
          :action="tempAction"
        >
          <button
            class="
              flex
              justify-center
              items-center
              space-x-2
              border
              px-2
              py-2
              rounded
              hover:bg-blue-500
              hover:text-blue-50
              focus:outline-none
            "
          >
            <upload-outlined></upload-outlined>
            <p class="mb-0">Ajouter des images</p>
          </button>
        </a-upload>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from "vue";
import { User } from "../../../../api/models";
import Editor from "../Editor.vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { FileItem } from "../../../models";
import { message } from "ant-design-vue";
import { PhotoResponse, HashTagResponse } from "../../../../api/responses";
import {
  CreatePostRequest,
  CreateHashtagRequest,
} from "../../../../api/requests";
import { HashTagService, PhotoService, PostService } from "../../../services";
import { EventKeys } from "../../../constants";
import { isEmpty, getUUID } from "../../../utils/str-utils";

export default defineComponent({
  name: "NewPostEditor",
  components: { UploadOutlined, Editor },
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
    openEditor: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const isLoading = ref(false);
    const editorUuid = ref<number>(getUUID());

    const photoService = new PhotoService();
    const fileList = ref<FileItem[]>([]);
    const uploadedImages: PhotoResponse[] = [];

    const postService = new PostService();

    const newPostEdit = ref(false);
    const title = ref<string>("");
    const postContent = ref("");

    const uploadImages = async () => {
      const items = [...fileList.value];
      for (const item of items) {
        const fileItem = Object.assign({}, item);
        const fileUploadResponse = await photoService.uploadPostPic(fileItem);

        if (typeof fileUploadResponse == "string") {
          message.error(fileUploadResponse);
          return;
        }

        uploadedImages.push(fileUploadResponse);
      }
    };

    const hashTagService = new HashTagService();
    const uploadedHashTags: HashTagResponse[] = [];
    const hashTagsData: Record<string, string[]> = {
      "#": [],
    };
    const hashtags = ref<string>("");
    const options = computed(() => {
      return hashTagsData[prefix.value] || [];
    });
    const prefix = ref<string>("#");
    const onSearch = (_: string, val: string) => (prefix.value = val);
    const uploadHashTags = async () => {
      const allTags = hashtags.value.split("#").filter((tag) => tag);
      for (let tag of allTags) {
        const hashTagRequest = <CreateHashtagRequest>{
          tag: tag.trim(),
        };
        const hashTagPostResult = await hashTagService.createTag(
          hashTagRequest
        );

        if (typeof hashTagPostResult == "string") {
          message.error(hashTagPostResult);
          return;
        }

        uploadedHashTags.push(hashTagPostResult);
      }
    };
    const loadHashTags = async () => {
      const hashTagsResponse = await hashTagService.getTags(true, 0, 200);
      if (typeof hashTagsResponse != "string") {
        hashTagsResponse.forEach((t: string) => hashTagsData["#"].push(t));
      } else message.error(hashTagsResponse);
    };
    onMounted(async () => await loadHashTags());
    watch(
      () => props.openEditor,
      () => {
        editorUuid.value = getUUID();
        newPostEdit.value = true;
      }
    );

    const onContentChanged = (e: any) => {
      postContent.value = e;
    };

    const resetForm = (): void => {
      title.value = "";
      postContent.value = "";
      hashtags.value = "";
    };

    const uploadPost = async () => {
      try {
        if (isEmpty(title.value) || isEmpty(postContent.value)) {
          message.error("Vous devez renseigner le titre et le contenu");
          return;
        }

        isLoading.value = true;
        await uploadImages();

        await uploadHashTags();

        const hashTags = uploadedHashTags.map((h) => h.tag);
        const photosIds = uploadedImages.map((i) => Number(i.id));

        const newPost = <CreatePostRequest>{
          title: title.value,
          body: postContent.value,
          hashtags: hashTags,
          photoIds: photosIds,
          userId: props.user.id,
        };

        const postResult = await postService.createPost(newPost);

        if (typeof postResult == "string") message.error(postResult);
        else {
          context.emit(EventKeys.PostAdded, postResult);
          newPostEdit.value = false;
          message.success("Publié");
          resetForm();
        }
      } finally {
        isLoading.value = false;
      }
    };

    const baseURL = import.meta.env.VITE_APP_API_URL;

    return {
      newPostEdit,
      isLoading,
      fileList,
      hashtags,
      editorUuid,
      options,
      onSearch,
      prefix,
      onContentChanged,
      uploadPost,
      title,
      tempAction: `${baseURL}api/posts/temp-upload`,
    };
  },
});
</script>
