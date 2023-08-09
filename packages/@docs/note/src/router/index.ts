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
    path: '/exercise1',
    component: () => import('@/views/exercise/Test1View.vue')
  },
  {
    path: '/exercise2',
    component: () => import('@/views/exercise/Test2View.vue')
  },
  {
    path: '/exercise3',
    component: () => import('@/views/exercise/Test3View.vue')
  },
  {
    path: '/exercise4',
    component: () => import('@/views/exercise/Test4View.vue')
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
