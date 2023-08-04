// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/main/Main.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/Main2.vue')
  },
  {
    path: '/exercise',
    component: () => import('@/views/exercise/Test1View.vue')
  },
  {
    path: '/home',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
