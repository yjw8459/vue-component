// Composables
import { createRouter, createWebHistory } from "vue-router";
import FirstView from "../views/detail/FirstView.vue";
import SecondView from "../views/detail/SecondView.vue";
import OrderView from "../views/order/OrderView.vue";
const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "Main",
        component: () => import("@/views/detail/Main.vue"),
      },
    ],
  },
  { path: "/first", component: FirstView },
  { path: "/second", component: SecondView },
  { path: "/order", component: OrderView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
