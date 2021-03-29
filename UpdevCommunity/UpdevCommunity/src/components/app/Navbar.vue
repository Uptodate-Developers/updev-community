<template>
    <nav class=" fixed left-0 right-0 bg-gray-50 z-30 shadow-sm">
        <div class=" md:hidden flex justify-between px-2 py-1">
            <img class=" h-8" src="../../assets/logo.svg" alt="UpdevCommunity short logo" />
            <button class=" px-2 py-1 rounded-lg hover:shadow-md focus:shadow-md focus:outline-none">
                <img src="../../assets/icons/search.svg" alt="Search icon" />
            </button>
        </div>
        <div  class=" md:hidden bg-gray-100">
           <horizontal-line/>
            <div class="grid grid-cols-3 content-center divide-x divide-gray-200">
                <router-link class=" py-1 text-gray-600 hover:text-blue-400 flex justify-center items-center" to="/app">
                    <svg class=" h-6 fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30.801 29.122">
                        <g id="home" transform="translate(0 -2.616)">
                            <g id="Group_58" data-name="Group 58" transform="translate(0 2.616)">
                                <g id="Group_55" data-name="Group 55" transform="translate(3.85 15.005)">
                                    <path id="Path_151" data-name="Path 151" d="M29.1,40.117H20.117V31.775H14.984v8.342H6V26.642a.642.642,0,1,1,1.283,0V38.834H13.7V30.492h7.7v8.342h6.417V27.283a.642.642,0,0,1,1.283,0Z" transform="translate(-6 -26)" />
                                </g>
                                <g id="Group_56" data-name="Group 56">
                                    <path id="Path_152" data-name="Path 152" d="M30.159,18.263a.64.64,0,0,1-.443-.178L15.4,4.392,1.085,18.085A.642.642,0,0,1,.2,17.158L15.4,2.616,30.6,17.157a.642.642,0,0,1-.443,1.106Z" transform="translate(0 -2.616)" />
                                </g>
                                <g id="Group_57" data-name="Group 57" transform="translate(19.892 2.171)">
                                    <path id="Path_153" data-name="Path 153" d="M36.133,11.775a.642.642,0,0,1-.642-.642V7.283h-3.85a.642.642,0,1,1,0-1.283h5.133v5.133A.642.642,0,0,1,36.133,11.775Z" transform="translate(-31 -6)" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </router-link>

                <router-link class=" py-1 text-gray-600 hover:text-blue-400 flex justify-center items-center" to="/app/notifications">
                    <svg class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24.2 32.947">
                        <g id="notifications" transform="translate(-5.3 -5.1)">
                            <g id="Layer_3" transform="translate(5.3 5.1)">
                                <path id="Path_155" data-name="Path 155" d="M29.063,29.057,26.585,26A1.977,1.977,0,0,1,26.2,24.83V18.512a8.849,8.849,0,0,0-6.415-8.5V7.53a2.437,2.437,0,0,0-2.43-2.43,2.469,2.469,0,0,0-2.43,2.43V9.96a8.835,8.835,0,0,0-6.415,8.553V24.83A1.977,1.977,0,0,1,8.119,26L5.64,29.057a1.534,1.534,0,0,0-.34.923V33.82H29.5V29.981A2.709,2.709,0,0,0,29.063,29.057ZM16.331,7.53a.972.972,0,0,1,1.944,0V9.717a6.844,6.844,0,0,0-1.992,0V7.53ZM27.945,32.313H6.661V29.981l2.478-3.061a3.22,3.22,0,0,0,.729-2.09V18.512a7.435,7.435,0,1,1,14.87,0V24.83a3.22,3.22,0,0,0,.729,2.09l2.478,3.061v2.333Z" transform="translate(-5.3 -5.1)"  />
                                <path id="Path_156" data-name="Path 156" d="M28,20.8v1.458a5.413,5.413,0,0,1,5.394,5.394h1.458A6.844,6.844,0,0,0,28,20.8Z" transform="translate(-16.969 -13.171)"  />
                                <path id="Path_157" data-name="Path 157" d="M25.785,67.227A2.51,2.51,0,0,1,23.258,64.7H21.8a3.985,3.985,0,0,0,7.97,0H28.312A2.51,2.51,0,0,1,25.785,67.227Z" transform="translate(-13.782 -35.737)" />
                            </g>
                        </g>
                    </svg>
                </router-link>
                <div>
                    <router-link to="profile">
                        <div class=" flex justify-center py-1">
                             <a-avatar   :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="32"><span style="line-height: 32px"  class="block text-sm font-semibold">JM</span></a-avatar>
                        </div>
                    </router-link>
                </div>
            </div>
           <horizontal-line/>
        </div>

        <div class="hidden md:flex justify-between items-center container mx-auto xl:px-12 py-2 px-2">
            <div>
                <img class="h-10" src="../../assets/updevcommunitylogo.svg" alt="UpdevCommunity Logo"/>
            </div>
            <div class="flex space-x-10 lg:space-x-20 ">
                <router-link class=" py-1 text-gray-600 hover:text-blue-400 flex justify-center items-center" to="/app">
                    <svg class=" h-7 fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30.801 29.122">
                        <g id="home" transform="translate(0 -2.616)">
                            <g id="Group_58" data-name="Group 58" transform="translate(0 2.616)">
                                <g id="Group_55" data-name="Group 55" transform="translate(3.85 15.005)">
                                    <path id="Path_151" data-name="Path 151" d="M29.1,40.117H20.117V31.775H14.984v8.342H6V26.642a.642.642,0,1,1,1.283,0V38.834H13.7V30.492h7.7v8.342h6.417V27.283a.642.642,0,0,1,1.283,0Z" transform="translate(-6 -26)" />
                                </g>
                                <g id="Group_56" data-name="Group 56">
                                    <path id="Path_152" data-name="Path 152" d="M30.159,18.263a.64.64,0,0,1-.443-.178L15.4,4.392,1.085,18.085A.642.642,0,0,1,.2,17.158L15.4,2.616,30.6,17.157a.642.642,0,0,1-.443,1.106Z" transform="translate(0 -2.616)" />
                                </g>
                                <g id="Group_57" data-name="Group 57" transform="translate(19.892 2.171)">
                                    <path id="Path_153" data-name="Path 153" d="M36.133,11.775a.642.642,0,0,1-.642-.642V7.283h-3.85a.642.642,0,1,1,0-1.283h5.133v5.133A.642.642,0,0,1,36.133,11.775Z" transform="translate(-31 -6)" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </router-link>

                 <router-link class=" py-1 text-gray-600 hover:text-blue-400 flex justify-center items-center" to="/app/notifications">
                    <svg class="h-7 fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24.2 32.947">
                        <g id="notifications" transform="translate(-5.3 -5.1)">
                            <g id="Layer_3" transform="translate(5.3 5.1)">
                                <path id="Path_155" data-name="Path 155" d="M29.063,29.057,26.585,26A1.977,1.977,0,0,1,26.2,24.83V18.512a8.849,8.849,0,0,0-6.415-8.5V7.53a2.437,2.437,0,0,0-2.43-2.43,2.469,2.469,0,0,0-2.43,2.43V9.96a8.835,8.835,0,0,0-6.415,8.553V24.83A1.977,1.977,0,0,1,8.119,26L5.64,29.057a1.534,1.534,0,0,0-.34.923V33.82H29.5V29.981A2.709,2.709,0,0,0,29.063,29.057ZM16.331,7.53a.972.972,0,0,1,1.944,0V9.717a6.844,6.844,0,0,0-1.992,0V7.53ZM27.945,32.313H6.661V29.981l2.478-3.061a3.22,3.22,0,0,0,.729-2.09V18.512a7.435,7.435,0,1,1,14.87,0V24.83a3.22,3.22,0,0,0,.729,2.09l2.478,3.061v2.333Z" transform="translate(-5.3 -5.1)"  />
                                <path id="Path_156" data-name="Path 156" d="M28,20.8v1.458a5.413,5.413,0,0,1,5.394,5.394h1.458A6.844,6.844,0,0,0,28,20.8Z" transform="translate(-16.969 -13.171)"  />
                                <path id="Path_157" data-name="Path 157" d="M25.785,67.227A2.51,2.51,0,0,1,23.258,64.7H21.8a3.985,3.985,0,0,0,7.97,0H28.312A2.51,2.51,0,0,1,25.785,67.227Z" transform="translate(-13.782 -35.737)" />
                            </g>
                        </g>
                    </svg>
                </router-link>

                <div>
                    <serch-input />
                </div>
            </div>
            <router-link to="/profile">
                 <div class="flex space-x-2">
                <div class=" flex justify-center ">
                    <a-avatar   :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="42"><span style="line-height: 42px" class="block text-lg font-semibold">JM</span></a-avatar>
                </div>
                <div class=" flex flex-col justify-center">
                    <h2 class=" my-0 text-gray-800">Julius Nyerere</h2>
                    <h3 class="my-0 text-xs text-gray-500">@juliusnyere</h3>
                </div>
            </div>
            </router-link>
           
        </div>
    </nav>
</template>
<script>
import Button from '../Button.vue'
import SerchInput from './SearchInput.vue'
import HorizontalLine from './HorizontalLine.vue'
export default{
    name:"Navbar",
    components:{SerchInput, Button, HorizontalLine}
}

</script>
