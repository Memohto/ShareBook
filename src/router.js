import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth'

import Home from '@/views/Home.vue';
// import Catalog from '@/views/Catalog.vue';
import Login from '@/views/Login.vue';
import UserRegistration from '@/views/UserRegistration.vue';
import Profile from '@/views/Profile.vue';
import BookRegistration from '@/views/BookRegistration.vue'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'UserRegistration',
    component: UserRegistration
  },
  {
    path: '/perfil',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/registroLibro',
    name: 'BookRegistration',
    component: BookRegistration
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && to.name !== 'UserRegistration' && !firebase.auth().currentUser) next('/login')
  next();
})

export default router;