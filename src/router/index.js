import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import StoryView from '../views/StoryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/storyid=:id',
      name: 'story',
      component: StoryView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
  ],
});

export default router;
