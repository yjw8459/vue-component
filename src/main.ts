/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

import axios from "axios";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// 루트 구성 요소 생성
const app = createApp(App);

app.config.globalProperties.$axios = axios;

registerPlugins(app);

// 루트 구성 요소(app)를 "#app"에 mount
app.mount("#app");
