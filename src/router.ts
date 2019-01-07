import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Smart lottery list',
      },
      component: Home,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('lottery/fetchLottery');
        next();
      },
    },
    {
      path: '/new-lottery',
      name: 'new-lottery',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "new-lottery" */ './views/NewLottery.vue'),
    },
    {
      path: '/buy-tickets/:lottery',
      name: 'buy-tickets',
      beforeEnter: async (to, from, next) => {
        await store.dispatch('lottery/getLottery', to.params.lottery);
        next();
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "buy-tickets" */ './views/BuyTickets.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

router.beforeEach((to, form, next) => {
  store.commit('layout/setLoading', true);
  next();
});

router.afterEach((to, form) => {
  store.commit('layout/setLoading', false);
});

export default router;
