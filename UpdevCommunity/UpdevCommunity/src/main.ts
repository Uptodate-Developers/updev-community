import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'ant-design-vue/dist/antd.less'
import router from './router'

import {
    Layout,
    Button,
    Avatar,
    Carousel
} from 'ant-design-vue';

const app = createApp(App);

app.use(Layout);
app.use(Button);
app.use(Avatar);
app.use(Carousel);
app.use(router);

app.mount('#app');