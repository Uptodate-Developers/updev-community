<template>
    <div class=" bg-gray-50 px-2 py-2 rounded-md space-y-2">
        <div class=" flex space-x-2">
            <a-avatar :style="{backgroundColor: '#0068B7', verticalAlign: 'middle'}" :size="50"><span style="line-height: 50px" class="block text-xl font-semibold">JM</span></a-avatar>
            <div>
                <h2 class=" mb-0">Julius Nyere</h2>
                <h3 class="  text-gray-400 font-light">12 Décembre 2020 à 8h30</h3>
            </div>
        </div>

        <div class="px-4">
            <h1 class=" text-gray-800">Comment résoudre l'erreur InvalidOperationException en Java?</h1>
            <p class=" text-gray-500">Je suis nouveau dans le development, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div class="px-4 space-x-1">
            <button class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#java</button>
            <button class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#python</button>
            <button class=" bg-gray-200 px-4 pb-0.5 rounded-2xl text-xs text-gray-500">#microservices</button>
        </div>

        <div class="pt-2 flex flex-col lg:flex-row-reverse lg:justify-between">
            <p class=" text-gray-400 self-end lg:self-stretch">2 minutes de lecture</p>
            <div class="flex justify-around space-x-4 lg:space-x-12">
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
                <button class="focus:outline-none">
                    <div class=" flex items-center space-x-1  text-gray-900 hover:text-blue-400">
                        <svg class=" h-4 fill-current" id="comment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.783 17.5">
                            <path id="Path_96" data-name="Path 96" d="M18.167,19.5,12.791,18a9,9,0,0,1-1.9.162C5.759,18.167,2,14.772,2,10.083A7.654,7.654,0,0,1,4.263,4.506,9.429,9.429,0,0,1,10.892,2c5.133,0,8.892,3.395,8.892,8.083a7.724,7.724,0,0,1-1.617,4.769Zm-5.375-2.3,4.567,1.253V14.61l.081-.121a6.958,6.958,0,0,0,1.536-4.405c0-4.2-3.395-7.275-8.083-7.275A8.571,8.571,0,0,0,4.829,5.072a6.924,6.924,0,0,0-2.021,5.012c0,4.2,3.395,7.275,8.083,7.275A7.992,7.992,0,0,0,12.71,17.2Z" transform="translate(-2 -2)" />
                        </svg>

                        <h3 class="text-current mb-0 font-normal">200</h3>
                    </div>
                </button>
                <button class="focus:outline-none">
                    <div class=" flex items-center space-x-1 text-gray-900 hover:text-blue-400">
                        <svg class=" h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.6 15">
                            <g id="view" transform="translate(-5.4 -5.4)">
                                <g id="Layer_3" transform="translate(5.4 5.4)">
                                    <path id="Path_97" data-name="Path 97" d="M15.2,5.4c-5.41,0-9.8,3.36-9.8,7.5s4.39,7.5,9.771,7.5,9.8-3.36,9.828-7.5h0C24.971,8.76,20.61,5.422,15.2,5.4Zm0,14.35c-4.928,0-8.95-3.078-8.95-6.85s4.022-6.85,8.95-6.85,8.922,3.078,8.95,6.85h0C24.122,16.672,20.128,19.728,15.2,19.75Z" transform="translate(-5.4 -5.4)" />
                                    <path id="Path_98" data-name="Path 98" d="M28.618,29.81a8.554,8.554,0,0,0-11.924-2.124A8.412,8.412,0,0,0,14.57,29.81l-.17.255.17.255a8.554,8.554,0,0,0,11.924,2.124,8.412,8.412,0,0,0,2.124-2.124l.17-.255Zm-7.024,3.314a7.7,7.7,0,0,1-6.146-3.059,7.724,7.724,0,0,1,10.819-1.5,7.539,7.539,0,0,1,1.5,1.5A7.8,7.8,0,0,1,21.594,33.124Z" transform="translate(-11.851 -22.565)" />
                                    <path id="Path_99" data-name="Path 99" d="M33.792,31.2a2.492,2.492,0,1,0,2.492,2.492A2.553,2.553,0,0,0,33.792,31.2Zm0,4.164a1.643,1.643,0,1,1,1.643-1.643h0A1.662,1.662,0,0,1,33.792,35.364Z" transform="translate(-23.964 -26.192)" />
                                    <circle id="Ellipse_20" data-name="Ellipse 20" cx="0.935" cy="0.935" r="0.935" transform="translate(8.893 6.565)" />
                                </g>
                            </g>
                        </svg>
                        <h3 class=" text-current mb-0 font-normal">400</h3>
                    </div>
                </button>
                <button class="focus:outline-none ">
                    <div class=" flex items-center space-x-1  text-gray-900 hover:text-blue-400">
                        <svg id="shareico" class=" h-4 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16">
                            <path id="Path_51" data-name="Path 51" d="M1.633,18.993a.73.73,0,0,1-.2,0A.616.616,0,0,1,1,18.378v-.615A11.8,11.8,0,0,1,11.131,6.223V3.615a.614.614,0,0,1,.35-.55.649.649,0,0,1,.663.058l7.6,5.536a.6.6,0,0,1,0,.984l-7.6,5.536a.649.649,0,0,1-.663.058.614.614,0,0,1-.35-.55V12.381a11.873,11.873,0,0,0-7.644,4.564l-1.343,1.8A.64.64,0,0,1,1.633,18.993ZM12.4,4.845V6.765a.622.622,0,0,1-.564.615,10.626,10.626,0,0,0-9.5,8.981l.1-.129A13.184,13.184,0,0,1,11.7,11.064a.645.645,0,0,1,.488.16.607.607,0,0,1,.209.455v1.778l5.909-4.306Z" transform="translate(-0.999 -3)" />
                        </svg>

                        <h3 class=" mb-0 text-current font-normal">partager</h3>
                    </div>
                </button>


            </div>
        </div>
    </div>
</template>