import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login.vue';
import Registration from '@/views/Registration.vue';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registro',
    component: Registration
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;