import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '../components/Login.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
})

export default router;
