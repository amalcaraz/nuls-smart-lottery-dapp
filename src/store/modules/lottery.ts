import { BuyTicketsModel, LotteryDetail } from './../../model/lottery';
import * as lotteryService from '../../services/lottery';
import {
  LotteryList,
  Lottery,
  NewLotteryModel,
} from '../../model/lottery';
import { NulsAccount } from '../../model/common';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    lotteryList: new Array<Lottery>(),
  },
  getters: {
    lotteryList: (state: any) => state.lotteryList,
    lottery: (state: any) => (id: string) => state.lotteryList.find((lottery: Lottery) => lottery.id === parseInt(id, 10)),
  },
  mutations: {
    updateLastHeight(state: any, height: number) {
      if (height > state.lastHeight) {
        state.lastHeight = height;
      }
    },
    addLottery(state: any, lotteryList: Lottery | Lottery[]) {
      const newLotteryList = [].concat.call([], lotteryList as any);
      state.lotteryList = [...newLotteryList];
    },
  },
  actions: {
    async fetchLotteryList({ commit }: any) {

      const response: LotteryList = await lotteryService.getLotteryList();
      commit('addLottery', response);

    },
    async fetchLotteryDetail({ commit }: any, id: number) {

      const response: LotteryDetail = await lotteryService.getLotteryDetail(id);
      commit('addLottery', response);

    },
    async getLottery({ dispatch, getters }: any, id: number) {

      const lottery: Lottery = getters.lottery(id);

      if (!lottery) {
        await dispatch('fetchLotteryList');
      }

    },
    async getLotteryDetail({ dispatch, getters }: any, id: number) {

      const lottery: Lottery | LotteryDetail = getters.lottery(id);

      if (!lottery || !(lottery as LotteryDetail).ticketMap) {
        await dispatch('fetchLotteryDetail', id);
      }

    },
    async newLottery({ commit, dispatch, rootGetters }: any, lottery: NewLotteryModel) {

      const account: NulsAccount = rootGetters['account/account'];

      if (!account) {
        router.push({ name: 'login' });
        throw new Error('Not logged in');
      }

      commit('layout/setLoading', true, { root: true });

      const response: string = await lotteryService.newLottery(account, lottery);

      console.log('pending tx => ', lottery, response);

      await waitAndFetchLotteryList(dispatch);


    },
    async buyTickets({ commit, dispatch, rootGetters }: any, tickets: BuyTicketsModel) {

      const account: NulsAccount = rootGetters['account/account'];

      if (!account) {
        router.push({ name: 'login' });
        throw new Error('Not logged in');
      }

      commit('layout/setLoading', true, { root: true });

      const response: string = await lotteryService.buyTickets(account, tickets);

      console.log('pending tx => ', tickets, response);

      await waitAndFetchLotteryList(dispatch);

    },
    async resolveLottery({ commit, dispatch, rootGetters }: any, id: number) {

      const account: NulsAccount = rootGetters['account/account'];

      if (!account) {
        router.push({ name: 'login' });
        throw new Error('Not logged in');
      }

      commit('layout/setLoading', true, { root: true });

      const response: string = await lotteryService.resolveLottery(account, id);

      console.log('pending tx => ', id, response);

      await waitAndFetchLotteryList(dispatch);


    },
  },
};

function waitAndFetchLotteryList(dispatch: any) {

  return new Promise((resolve) => {

    setTimeout(async () => {
      await dispatch('fetchLotteryList');
      resolve();
    }, 1000 * 10);
    // commit('addLottery', response);

  });

}
