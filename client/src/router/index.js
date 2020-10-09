import Vue from 'vue'
import store from '../store';
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import DashBoard from '../views/project/DashBoard';
import AppConfig from '../views/project/AppConfig';
import AdsConfig from '../views/project/AdsConfig';
import InAppSettings from '../views/project/InAppSettings';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/projects',
    component: () => import('../views/Projects.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/:id',
    component: () => import('../views/project/ProjectHome.vue'),
    children: [
      { path: '', component: DashBoard },
      { path: 'app_config', component: AppConfig },
      { path: 'ads_config', component: AdsConfig },
      { path: 'inapp_settings', component: InAppSettings }
    ],
    meta: {
      requiresAuth: true
    }
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  
  let loggedIn = store.getters['auth/loggedIn'];

  if (to.matched.some(record => record.meta.requiresAuth)) {  
    if (!loggedIn) 
      next({path: '/login'});
    
    else 
      next();
  }
  else if(to.path == '/login') {
    if(loggedIn) 
      next({path: '/projects'});
    
    else 
      next();
  }
  else  // don't need auth
    next();
});

export default router
