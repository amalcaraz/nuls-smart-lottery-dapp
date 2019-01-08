import * as loginService from '../../services/account';
import { NulsAccount } from '../../model/common';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    account: undefined,
  },
  getters: {
    account: (state: any) => state.account,
    isLoggedIn: (state: any) => !!state.account,
  },
  mutations: {
    updateAccount(state: any, account: NulsAccount) {
      state.account = account;
    },
  },
  actions: {
    login({ commit }: any, privateKey: string) {

      const account: NulsAccount = loginService.login(privateKey);
      commit('updateAccount', account);

    },
    logout({ commit }: any) {

      commit('updateAccount', undefined);
      router.push( { name: 'home' });

    },
  },
};
