import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StarryEcosystem from '@/views/StarryEcosystem.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/planets',
    name: 'planets',
    component: () => import('../components/Planets.vue'),
  },
  {
    path: '/starrybackground',
    name: 'starrybackground',
    component: StarryEcosystem,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
