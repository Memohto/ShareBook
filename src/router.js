import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login.vue';
import Registration from '@/views/Registration.vue';
import Home from '@/views/Home.vue';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Registration
  },
    {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;