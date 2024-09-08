import "./assets/css/base.css";
import "./assets/css/keyframes.css";
import "./assets/css/tailwindcss.css";
import "./assets/css/theme.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// import naive from "naive-ui";
import { VMdPreview } from "@/plugins/mdPreivew";
import VueDOMPurifyHTML from "vue-dompurify-html";
import DynamicBackground from "@/components/Layout/DynamicBackground.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component("DynamicBackground", DynamicBackground);
app.use(createPinia());
app.use(router);
app.use(VMdPreview);
app.use(VueDOMPurifyHTML);

app.mount("#app");
