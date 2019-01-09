import * as loginService from '../../services/account';
import { NulsAccount } from '../../model/common';
import router from '@/router';
import { NulsAccountModel } from '@/model/account';
import config from 'config';

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
    login({ commit, dispatch }: any, accountModel: NulsAccountModel) {

      const account: NulsAccount = loginService.login(accountModel.privateKey);
      commit('updateAccount', account);

      if (accountModel.saveSession) {
        dispatch('store');
      }

    },
    logout({ commit, dispatch }: any) {

      commit('updateAccount', undefined);
      dispatch('store');

      router.push({ name: 'home' });

    },
    store({ state }: any) {

      if (localStorage) {
        const key: string = config.app.localStoreKey;
        state.account
          ? localStorage.setItem(key, JSON.stringify(state.account))
          : localStorage.removeItem(key);
      }

    },
    retrieve({ commit }: any) {

      if (localStorage) {
        const key: string = config.app.localStoreKey;
        const loadedAccount: string | null = localStorage.getItem(key);
        if (loadedAccount) {
          commit('updateAccount', JSON.parse(loadedAccount));
        }
      }

    },
  },
};
