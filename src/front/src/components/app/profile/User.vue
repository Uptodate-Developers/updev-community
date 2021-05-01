<template>
    <div class="px-4 py-4 bg-gray-50">
        <div class="flex justify-between">
            <div class=" flex items-center space-x-2">
                <a-avatar :src="user.profilePicUrl" :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="70"><span style="line-height: 70px" class="block text-2xl font-semibold">{{avatar}}</span></a-avatar>
                <div>
                    <h2>{{fullName}}</h2>
                    <h3 class=" text-gray-400">{{user.profession}}</h3>
                </div>
            </div>

            <button @click="updateUser = !updateUser" class=" text-gray-400 hover:text-blue-400 outline-none focus:outline-none">
                <svg class=" fill-current hover:text-blue-400" id="edit" xmlns="http://www.w3.org/2000/svg" width="29.201" height="29.2" viewBox="0 0 29.201 29.2">
                    <g id="Group_64" data-name="Group 64">
                        <g id="Group_60" data-name="Group 60" transform="translate(0 2.433)">
                            <path id="Path_158" data-name="Path 158" d="M22.508,30.767H0V4H17.642a.608.608,0,0,1,0,1.217H1.217V29.55H21.292V16.167a.608.608,0,0,1,1.217,0Z" transform="translate(0 -4)"  />
                        </g>
                        <g id="Group_61" data-name="Group 61" transform="translate(13.383 10.342)">
                            <path id="Path_159" data-name="Path 159" d="M22,17" transform="translate(-22 -17)" fill="#afafaf" />
                        </g>
                        <g id="Group_62" data-name="Group 62" transform="translate(12.554)">
                            <path id="Path_160" data-name="Path 160" d="M21.245,16.646a.609.609,0,0,1-.545-.88l1.72-3.441a.6.6,0,0,1,.114-.158L34.15.552A1.775,1.775,0,0,1,35.42,0a1.905,1.905,0,0,1,1.726,1.186,1.743,1.743,0,0,1-.415,1.946L25.116,14.747a.625.625,0,0,1-.158.114l-3.441,1.721A.607.607,0,0,1,21.245,16.646Zm2.22-3.69-.86,1.721,1.721-.861L35.871,2.272a.536.536,0,0,0,.152-.621.707.707,0,0,0-.6-.435.582.582,0,0,0-.411.2Z" transform="translate(-20.636)"  />
                        </g>
                        <g id="Group_63" data-name="Group 63" transform="translate(24.168 2.094)">
                            <path id="Path_161" data-name="Path 161" d="M42.058,6.379a.609.609,0,0,1-.431-.178L39.906,4.48a.609.609,0,0,1,.861-.861l1.72,1.721a.609.609,0,0,1-.43,1.039Z" transform="translate(-39.729 -3.441)"  />
                        </g>
                    </g>
                </svg>
            </button>
        </div>
        <div class=" mt-3 md:flex justify-between items-center md:space-x-8">
          <div>
            <p class=" text-sm mb-1 text-gray-800">{{user.phoneNumber}}</p>
            <p class=" text-sm mb-1 text-gray-800">{{user.email}}</p>
            <p class=" text-sm text-gray-800 max-w-lg">{{user.bio}}</p>
          </div>
            <div class=" space-x-2 flex">
                <button class="focus:outline-none" @click="onOpenSocial(user.githubProfileLink)"  ><img class=" h-8 md:h-24 lg:h-10 " src="../../../assets/icons/githubblack.svg" alt="Github logo"/></button>
                <button class="focus:outline-none" @click="onOpenSocial(user.twitterProfileLink)"><img class=" h-8 md:h-24 lg:h-10 " src="../../../assets/icons/twitter.svg" alt="Twitter logo"/></button>
                <button class="focus:outline-none" @click="onOpenSocial(user.facebookProfileLink)"><img class=" h-8 md:h-24 lg:h-10 " src="../../../assets/icons/facebook.svg" alt="Facebook  logo"/></button>
            </div>
        </div>
    </div>
  <updater-user :user="user" :canUpdate="updateUser"/>
</template>
<script lang="ts">
import {computed,ref, defineComponent} from "vue"
import {User} from "../../../../api/models/User"
import UpdaterUser from "./UpdaterUser.vue"

export default defineComponent({
  name:"UserProfileVue",
  components:{UpdaterUser},
  props:{
    user:{
      type: Object as () => User,
      required: true
    }
  },
  setup({user}){
    const fullName = computed(() => `${user.name} ${user.firstName} ${user.lastName}`);
    const avatar = computed(()=> `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`);

    const updateUser = ref(false)

    const onOpenSocial = (link) => window.open(link)

    return {fullName, avatar, updateUser,onOpenSocial}
  }
})
</script>