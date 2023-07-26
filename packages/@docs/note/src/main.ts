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

import { createPinia } from "pinia";

import { useAppStore } from "./store/app";

// Plugins
import { registerPlugins } from "@/plugins";

// 루트 구성 요소 생성
const app = createApp(App);

const pinia = createPinia(); // Pinia 생성

app.config.globalProperties.$axios = axios;

registerPlugins(app);

app.use(pinia);

// 루트 구성 요소(app)를 "#app"에 mount
app.mount("#app");
