<template>
    <div class="px-2 py-1 rouded-md bg-gray-50 space-y-2">
        <div class=" flex space-x-2">
            <a-avatar :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="45"><span style="line-height: 45px" class="block text-lg font-semibold">JM</span></a-avatar>
            <div>
                <h2 class=" mb-0">Julius Nyere</h2>
                <h3 class=" text-xs  text-gray-400 font-light">12 Décembre 2020 à 8h30</h3>
            </div>
        </div>
        <div class=" flex px-4">
            <div style="width:1.5px" class="bg-gray-200 h-full"></div>
            <div>
                <p class=" text-gray-500">Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna ali Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.....</p>
            </div>
        </div>
        <div class=" flex space-x-4">
            <button class="focus:outline-none">
                <div class=" flex items-center space-x-1 text-gray-900  hover:text-blue-400">
                    <svg class=" fill-current h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20.634">
                        <g id="upvoteico" transform="translate(25 -3) rotate(90)">
                            <g id="Group_72" data-name="Group 72">
                                <path id="Path_162" data-name="Path 162" d="M10.619,7,3,16l7.619,9V19.5H23.634v-7H10.619Zm12.222,6.5v5H9.825v4.2L4.19,16,9.9,9.3v4.2Z" />
                            </g>
                        </g>
                    </svg>

                    <h3 class=" text-current fill-current mb-0 font-normal">20</h3>
                </div>
            </button>
            <button class="focus:outline-none ">
                <div class=" flex items-center space-x-1  text-gray-900 hover:text-blue-400">
                    <svg class=" h-4 fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 19.359 16">
                        <g id="respondico" transform="translate(-0.999 -3)">
                            <path id="Path_51" data-name="Path 51" d="M19.712,18.993a.758.758,0,0,0,.2,0,.617.617,0,0,0,.445-.615v-.615A11.871,11.871,0,0,0,10.034,6.223V3.615a.613.613,0,0,0-.357-.55A.672.672,0,0,0,9,3.123L1.257,8.659a.6.6,0,0,0,0,.984L9,15.18a.672.672,0,0,0,.676.058.613.613,0,0,0,.357-.55V12.381a12.139,12.139,0,0,1,7.788,4.564l1.368,1.8A.656.656,0,0,0,19.712,18.993ZM8.742,4.845V6.765a.626.626,0,0,0,.574.615A10.742,10.742,0,0,1,19,16.361l-.1-.129a13.5,13.5,0,0,0-9.44-5.167.665.665,0,0,0-.5.16.6.6,0,0,0-.213.455v1.778L2.722,9.151Z" transform="translate(0 0)" />
                        </g>
                    </svg>

                    <h3 class=" mb-0 text-current font-normal">répondre</h3>
                </div>
            </button>

        </div>
    </div>
</template>