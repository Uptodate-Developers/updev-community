<template>
  <a-modal v-if="user"  title="Modifier mon profile" :visible="updateUser" @cancel="updateUser = false" @ok="onSubmit" cancelText="Annuler" okText="Valider" :confirmLoading="isLoading">

    <div class="flex justify-center items-center">
      <a-upload v-model:file-list="fileList"  name="avatar" list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false" @change="handleChange">
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="isLoading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Télécharger une photo de profile</div>
        </div>

      </a-upload>
    </div>


  <a-form :model="userForm" layout="vertical" >
    <a-form-item label="Nom" >
      <a-input v-model:value="userForm.name" placeholder="Banza" />
    </a-form-item>
    <a-form-item label="Postnom" >
      <a-input v-model:value="userForm.lastName" />
    </a-form-item>
    <a-form-item label="Prenom" >
      <a-input v-model:value="userForm.firstName" />
    </a-form-item>
    <a-form-item label="Profession" >
      <a-input v-model:value="userForm.profession" placeholder="UI/UX Developer" />
    </a-form-item>
    <a-form-item label="Email" >
      <a-input v-model:value="userForm.email" placeholder="exmaple@gmail.com" />
    </a-form-item>
    <a-form-item label="Numéro de téléphone" >
      <a-input v-model:value="userForm.phoneNumber" placeholder="+24393892323" />
    </a-form-item>
    <a-form-item label="Bio" >
      <a-textarea v-model:value="userForm.bio" placeholder="Une petite description de vous" />
    </a-form-item>
    <a-form-item label="Lien de votre profil Facebook" >
      <a-input v-model:value="userForm.facebookProfileLink"  />
    </a-form-item>
    <a-form-item label="Lien de votre profil Twitter" >
      <a-input v-model:value="userForm.twitterProfileLink"  />
    </a-form-item>
    <a-form-item label="Lien de votre profil Github" >
      <a-input v-model:value="userForm.githubProfileLink"  />
    </a-form-item>
  </a-form>
  </a-modal>
</template>
<script lang="ts">
import {defineComponent,reactive,UnwrapRef, watch,ref,toRaw} from "vue"
import {User} from "../../../../api/models"
import {AuthService,UserService,PhotoService} from "../../../services"
import {UpdateUserRequest} from "../../../../api/requests"
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import {FileInfo} from "../../../models/files/FileInfo"



export default defineComponent({
  name:"UpdateUser",
  components:{LoadingOutlined, PlusOutlined},
  props:{
    user:{
      type: Object as () => User,
      required:true
    },
    canUpdate:{
      type:Boolean,
      required:true
    }
  },
  setup(props){
    const userForm:UnwrapRef<User> = reactive(props.user)
    const updateUser = ref(false)
    const authService = new AuthService()
    const userService = new UserService()
    const isLoading = ref(false)
    const fileList = ref([])
    const imageUrl = ref(props.user.profilePicUrl ?? "")
    let uploadImageUrl = ""


    watch(() => props.canUpdate,() => updateUser.value = true)

    const onSubmit = async () =>{
        isLoading.value = true
        userForm.profilePicUrl = uploadImageUrl ? uploadImageUrl : props.user.profilePicUrl
        const updateData = toRaw(userForm)
        const userUpdateRequest = <UpdateUserRequest>{
          userId:props.user.id.toString(),
          email:updateData.email,
          phoneNumber: updateData.phoneNumber,
          name : updateData.name,
          firstName : updateData.firstName,
          lastName:updateData.lastName,
          profession:updateData.profession,
          bio:updateData.bio,
          profilePic:updateData.profilePicUrl,
          twitterProfileLink:updateData.twitterProfileLink,
          facebookProfileLink:updateData.facebookProfileLink,
          githubProfileLink:updateData.githubProfileLink
        }
        const response = await userService.updateUser(userUpdateRequest)

      if(typeof response == "string") {
        message.error(response)
      }
        else {
        authService.user = response
        message.success("Profile mise à jour")
      }

      isLoading.value = false
      updateUser.value = false
    }

    const photoService = new PhotoService()
    const handleChange = async (info: FileInfo) => {
      isLoading.value = true
      const uplaodResult = await photoService.uploadUserPorfilePic(info.file)

      if(typeof uplaodResult !== "string") {
        imageUrl.value = uplaodResult.url
        uploadImageUrl = uplaodResult.url
      }
      else{
        message.error(uplaodResult)
      }

      isLoading.value = false
    }

    return {userForm, updateUser,onSubmit, isLoading, fileList,handleChange,imageUrl}
  }
})
</script>
<style type="text/css" scoped>
.ant-row{
margin-bottom: 8px;
}
.ant-form-vertical .ant-form-item{
  padding-bottom: 0px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.ant-upload-picture-card-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>