import "./assets/main.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

app.mount("#app");
