import store from '@/store/index';
import { Route } from 'vue-router';

export default (to: Route, from: Route, next: any) => {

  const requiresAuth = mergeRouteMeta(to).auth;
  const isLoginPage: boolean = isLoginRoute(to);

  if (requiresAuth || isLoginPage) {

    const isLoggedIn: boolean = store.getters['account/isLoggedIn'];

    if (isLoggedIn) {

      !isLoginPage
        ? next()
        : next({ name: 'home' });

    } else {

      !isLoginPage
        ? next({ name: 'login', query: { redirectUrl: to.fullPath } })
        : next();

    }

  } else {

    next();

  }

};

function isLoginRoute(route: Route) {
  return route.name === 'login';
}

function mergeRouteMeta(route: Route) {
  return route.matched.length > 0
    ? route.matched.reduce((prev, curr) => ({ ...prev, ...curr.meta }), {})
    : route.meta;
}
