import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/app.scss";
import "./assets/css/animations.css";
import "./assets/css/index.css";
import "ant-design-vue/dist/antd.less";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueScrollTo from "vue-scrollto";
import ShareButton from "./components/app/forum/ShareButton.vue";
import "./registerServiceWorker";
import { createMetaManager } from "vue-meta";
import { createPinia } from "pinia";

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
  Icon,
  Tooltip,
  Popover
} from "ant-design-vue";

import SocketIO from "socket.io-client";
import VueSocketIO from "./modules/vue-socket-io/src/index.js";

const optionsVueIO = {
  debug: true,
  connection: SocketIO("http://localhost:5000")
};

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
app.use(List);
app.use(router);
app.use(VueScrollTo);
app.use(VueAxios, axios);
app.use(Spin);
app.use(Icon);
app.use(Tooltip);
app.use(Popover);
app.use(createMetaManager());
app.use(createPinia());
app.use(new VueSocketIO(optionsVueIO));

app.component("share-button", ShareButton);

app.mount("#app");
