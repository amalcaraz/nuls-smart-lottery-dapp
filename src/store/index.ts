import Vue from 'vue';
import Vuex from 'vuex';
import layout from './modules/layout';
import error from './modules/error';
import account from './modules/account';
import lottery from './modules/lottery';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    error,
    account,
    lottery,
  },
});

export default store;
