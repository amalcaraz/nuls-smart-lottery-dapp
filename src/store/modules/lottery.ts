import { TransactionStatus, TransactionStatusStatus } from './transactionMonitor';
import { BuyTicketsModel, LotteryDetail } from './../../model/lottery';
import * as lotteryService from '../../services/lottery';
import {
  LotteryList,
  Lottery,
  NewLotteryModel,
} from '../../model/lottery';
import { NulsAccount, AppNotificationModel } from '../../model/common';
import router from '../../router';
import { TransactionReceipt, PromiEvent, TransactionHash } from 'nuls-js';
import moment from 'moment';

const errorNotification: AppNotificationModel = {
  kind: 'error',
  timeout: 1000 * 5,
  message: '',
};

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

      try {

        const response: LotteryList = await lotteryService.getLotteryList();
        commit('addLottery', response);

      } catch (e) {

        handleErrors(e, commit);

      }

    },
    async fetchLotteryDetail({ commit }: any, id: number) {

      try {

        const response: LotteryDetail = await lotteryService.getLotteryDetail(id);
        commit('addLottery', response);

      } catch (e) {

        handleErrors(e, commit);

      }

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

      const txStatus = {
        title: 'Create lottery',
      } as TransactionStatus;

      try {

        const account: NulsAccount = rootGetters['account/account'];
        checkAccount(account);

        commit('layout/setLoading', true, { root: true });

        const response: PromiEvent<TransactionReceipt> = lotteryService.newLottery(account, lottery);

        response.on('txHash', (txHash: TransactionHash) => {
          updateTransactionStatus('pending', txStatus, txHash, commit);
        });

        const txReceipt: TransactionReceipt = await (response as Promise<TransactionReceipt>);
        updateTransactionStatus('mined', txStatus, txReceipt, commit);

        await dispatch('fetchLotteryList');

      } catch (e) {

        handleErrors(e, commit, txStatus);

      }

    },
    async buyTickets({ commit, dispatch, rootGetters }: any, tickets: BuyTicketsModel) {

      const txStatus = {
        title: 'Buy tickets',
      } as TransactionStatus;

      try {

        const account: NulsAccount = rootGetters['account/account'];
        checkAccount(account);

        commit('layout/setLoading', true, { root: true });

        const response: PromiEvent<TransactionReceipt> = lotteryService.buyTickets(account, tickets);

        response.on('txHash', (txHash: TransactionHash) => {
          updateTransactionStatus('pending', txStatus, txHash, commit);
        });

        const txReceipt: TransactionReceipt = await (response as Promise<TransactionReceipt>);
        updateTransactionStatus('mined', txStatus, txReceipt, commit);

        await dispatch('fetchLotteryList');

      } catch (e) {

        handleErrors(e, commit, txStatus);

      }

    },
    async resolveLottery({ commit, dispatch, rootGetters }: any, id: number) {

      const txStatus = {
        title: 'Resolve lottery',
      } as TransactionStatus;

      try {

        const account: NulsAccount = rootGetters['account/account'];
        checkAccount(account);

        commit('layout/setLoading', true, { root: true });

        const response: PromiEvent<TransactionReceipt> = lotteryService.resolveLottery(account, id);

        response.on('txHash', (txHash: TransactionHash) => {
          updateTransactionStatus('pending', txStatus, txHash, commit);
        });

        const txReceipt: TransactionReceipt = await (response as Promise<TransactionReceipt>);
        updateTransactionStatus('mined', txStatus, txReceipt, commit);

        await dispatch('fetchLotteryList');

      } catch (e) {

        handleErrors(e, commit, txStatus);

      }

    },
  },
};

function updateTransactionStatus(
  status: TransactionStatusStatus, txStatus: TransactionStatus, data: TransactionReceipt | TransactionHash | string, commit: any): void {

  switch (status) {
    case 'mined':
      txStatus.hash = (data as TransactionReceipt).hash;
      txStatus.blockHeight = (data as TransactionReceipt).blockHeight;
      break;
    case 'pending':
      txStatus.hash = (data as TransactionHash);
      break;
    case 'error':
      txStatus.error = (data as string);
      txStatus.hash = txStatus.hash || `${txStatus.date}`;
      break;
  }

  txStatus.status = status;
  txStatus.date = moment().valueOf();
  commit('transactionMonitor/setTransaction', txStatus, { root: true });

}

function checkAccount(account: any) {

  if (!account) {
    router.push({ name: 'login' });
    throw new Error('Not logged in');
  }

}

function handleErrors(e: any, commit: any, txStatus?: TransactionStatus) {

  // Format contract error messages
  e.message = e.message.replace(/^(.+) - (.+)/, '$2');

  if (e.response && e.response.data) {
    e = new Error(`${e.response.data.message}${e.response.data.extendedMessage ? (' - ' + e.response.data.extendedMessage) : ''}`);
  }

  if (txStatus) {

    updateTransactionStatus('error', txStatus, e.message, commit);

  }

  commit('layout/setNotification', { ...errorNotification, message: e.message }, { root: true });
  commit('layout/setLoading', false, { root: true });
  throw e;

}
