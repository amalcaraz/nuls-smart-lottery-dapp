import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';
import authGuard from './guards/auth';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('lottery/fetchLotteryList');
        next();
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
      path: '/lottery/:lottery/detail',
      name: 'lottery-detail',
      meta: { title: 'Lottery Detail' },
      beforeEnter: async (to, from, next) => {
        await store.dispatch('lottery/getLotteryDetail', to.params.lottery);
        next();
      },
      component: () => import(/* webpackChunkName: "lottery-detail" */ '../views/LotteryDetail.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    },
    {
      path: '/new-lottery',
      name: 'new-lottery',
      meta: { title: 'Create Lottery', auth: true },
      component: () => import(/* webpackChunkName: "new-lottery" */ '../views/NewLottery.vue'),
    },
    {
      path: '/lottery/:lottery/buy-tickets',
      name: 'buy-tickets',
      meta: { title: 'Buy tickets', auth: true },
      beforeEnter: async (to, from, next) => {
        await store.dispatch('lottery/getLottery', to.params.lottery);
        next();
      },
      component: () => import(/* webpackChunkName: "buy-tickets" */ '../views/BuyTickets.vue'),
    },
  ],
});

router.beforeEach((to: Route, form: Route, next: any) => {
  store.commit('layout/setLoading', true);
  next();
});

router.afterEach((to: Route, form: Route) => {
  store.commit('layout/setLoading', false);
});

router.beforeEach(authGuard);


export default router;
