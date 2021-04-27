<template>
  <a-modal  title="Créer un post" :visible="newPostEdit" @cancel="newPostEdit = false"  cancelText="Annuler" okText="Publier" @ok="uploadPost" :confirmLoading="isLoading">

    <div class="-mx-4 -mt-4">
      <a-input  v-model:value="title" placeholder="Titre" />
    </div>
    <tiptap-editor class="mt-2" @contentChanged="onContentChanged" content="Qu'est-ce qui préoccupe votre esprit?" can-edit="true"/>

    <div class="mt-6 space-y-2 -mx-4" >
      <div>
        <a-mentions v-model:value="hashtags" placeholder="# pour ajouter un hashtag"
                    :prefix="['#']"
                    @search="onSearch">
          <a-mentions-option v-for="value in options" :key="value" :value="value">
            {{ value }}
          </a-mentions-option>
        </a-mentions>
      </div>
     <div>
       <a-upload accept="image/*" list-type="picture"  v-model:file-list="fileList">
         <button class="flex justify-center items-center space-x-2 border px-2 py-2 rounded hover:bg-blue-500 hover:text-blue-50 focus:outline-none" >
           <upload-outlined></upload-outlined>
           <p class="mb-0">Ajouter des images</p>
         </button>
       </a-upload>
     </div>
    </div>

  </a-modal>
</template>
<script lang="ts">
import {defineComponent, ref, watch,computed,onMounted} from "vue"
import {User} from "../../../../api/models"
import TiptapEditor from "../TiptapEditor.vue"
import { UploadOutlined } from '@ant-design/icons-vue'
import {FileItem} from "../../../models"
import {message} from "ant-design-vue"
import {PhotoResponse,HashTagResponse} from "../../../../api/responses"
import {CreatePostRequest, CreateHashtagRequest} from "../../../../api/requests"
import {HashTagService, PhotoService, PostService} from "../../../services"

export default defineComponent({
  name:"NewPostEditor",
  components:{TiptapEditor, UploadOutlined},
  props:{
    user:{
      type: Object as () => User,
      required: true
    },
    openEditor:{
      type:Boolean,
      default:false
    }
  },
  setup(props) {
    const isLoading = ref(false)

    const photoService = new PhotoService()
    const fileList = ref<FileItem[]>([])
    const uploadedImages:PhotoResponse[] = []
    const uploadImages = async () => {
      const items = [...fileList.value]
      for (const item of items) {

        const fileItem = Object.assign({}, item)
        const fileUploadResponse = await photoService.uploadPostPic(fileItem)

        if(typeof fileUploadResponse == "string") {
            message.error(fileUploadResponse)
            return
          }

        uploadedImages.push(fileUploadResponse)
      }
    }

    const hashTagService = new HashTagService()
    const uploadedHashTags:HashTagResponse[] = []
    const hashTagsData: Record<string, string[]> = {
      "#": [],
    }
    const hashtags = ref<string>('')
    const options = computed(() => {
      return hashTagsData[prefix.value] || []
    })
    const prefix = ref<string>("#")
    const onSearch = (_: string, val: string) => prefix.value = val
    const uploadHashTags = async () => {
      const allTags = hashtags.value.split('#').filter(tag => tag)
      for (let tag of allTags) {
        const hashTagRequest = <CreateHashtagRequest>{
          tag: tag.trim()
        }
        const hashTagPostResult = await hashTagService.createTag(hashTagRequest)

        if (typeof hashTagPostResult == "string") {
          message.error(hashTagPostResult)
          return
        }

        uploadedHashTags.push(hashTagPostResult)
      }
    }
    const loadHashTags = async () => {
      const hashTagsResponse = await hashTagService.getTags(true,0,100)
      if(typeof hashTagsResponse != "string"){
        hashTagsResponse.forEach((t: string) => hashTagsData["#"].push(t))
      }
      else
        message.error(hashTagsResponse)
    }
    onMounted( async () => await loadHashTags())


    const newPostEdit = ref(false)
    const title = ref<string>("")
    const postContent = ref("Qu'est-ce qui préoccupe votre esprit?")
    const onContentChanged = (e:any) => postContent.value = e
    watch(() => props.openEditor,() => newPostEdit.value = true)

    const postService = new PostService()
    const uploadPost = async () => {
      isLoading.value = true
      await uploadImages()

      await uploadHashTags()

      const hashTags = uploadedHashTags.map(h => h.tag)
      const photosIds = uploadedImages.map((i => i.id))

      const newPost = <CreatePostRequest>{
        title:title.value,
        body: postContent.value,
        hashtags:hashTags,
        photoIds:photosIds,
        userId:props.user.id
      }

      const postResult = await postService.createPost(newPost)

      if(typeof postResult == "string")
        message.error(postResult)
      else {
        newPostEdit.value = false
        message.success("Publié")
      }

      isLoading.value = false
    }

    return {newPostEdit, isLoading, fileList, hashtags,options,onSearch, prefix, onContentChanged,uploadPost,title}
  }
})
</script>
