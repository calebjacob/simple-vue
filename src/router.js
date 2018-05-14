import Vue from 'vue';
import VueRouter from 'vue-router';



// components:

import home from '@/components/home.vue';
import otherPage from '@/components/other-page.vue';



// configure router:

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/other-page',
      name: 'otherPage',
      component: otherPage
    }
  ]
});



export default router;
