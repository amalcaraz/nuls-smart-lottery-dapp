import Vue from 'vue';
import Vuex from 'vuex';
import layout from './modules/layout';
import error from './modules/error';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    error,
  },
});

export default store;
