import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import VueScrollTo from 'vue-scrollto'

import {
    Avatar,
    Carousel,
    Tabs
} from 'ant-design-vue';

const app = createApp(App);

app.use(Avatar);
app.use(Carousel);
app.use(Tabs)
app.use(router);
app.use(VueScrollTo);

app.mount('#app');