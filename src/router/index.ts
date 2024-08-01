import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StarryEcosystem from '@/views/StarryEcosystem.vue';
import PlanetsView from '@/views/PlanetsView.vue'; // Importer le nouveau composant PlanetsView

const routes = [
  {
    path: '/',
    name: 'home',
    component: PlanetsView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/planets',
    name: 'planets',
    component: PlanetsView, // Utiliser PlanetsView ici
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
