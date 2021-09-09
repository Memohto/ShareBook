import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import router from './router';
import axios from 'axios';
import _ from 'lodash';
import firebase from 'firebase/app';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import Font awesome icons
import '@fortawesome/fontawesome-free/js/all.js';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

//Global variables
Vue.prototype.$axios = axios;
Vue.prototype.$_ = _;


//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGOK53FaDv_xLCAVXti-g57cBk80ll-b4",
  authDomain: "sharebook-bfebb.firebaseapp.com",
  projectId: "sharebook-bfebb",
  storageBucket: "sharebook-bfebb.appspot.com",
  messagingSenderId: "370938725208",
  appId: "1:370938725208:web:5c24f3b5806398aa4f5b2d"
};

//Initialize firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')