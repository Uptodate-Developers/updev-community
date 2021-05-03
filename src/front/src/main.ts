import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueScrollTo from 'vue-scrollto'
import {
    Avatar,
    Carousel,
    Tabs,
    Badge,
    Modal,
    Form,
    Input,
    Upload,
    Mentions,
    Image,
    List,
    Spin,
    Tooltip
} from 'ant-design-vue';



const app = createApp(App);

app.use(Avatar);
app.use(Carousel);
app.use(Tabs);
app.use(Badge);
app.use(Modal);
app.use(Form);
app.use(Input);
app.use(Upload);
app.use(Mentions);
app.use(Image);
app.use(List)
app.use(router);
app.use(VueScrollTo);
app.use(VueAxios, axios);
app.use(Spin);
app.use(Tooltip)


app.mount('#app');