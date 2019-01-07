import * as lotteryService from '../../services/lottery';
import {
  LotteryList,
  Lottery,
  LotteryFilters,
  NewLotteryModel,
} from '../../model/lottery';

// function filterLotteryByFrom(lotteryList: Lottery[], addr: address): Lottery[] {
//   return lotteryList.filter((tx: Lottery) => tx.inputs.some((input: LotteryInput) => input.address === addr));
// }

// function filterLotteryByTo(lotteryList: Lottery[], addr: address): Lottery[] {
//   return lotteryList.filter((tx: Lottery) => tx.outputs.some((output: LotteryOutput) => output.address === addr));
// }

// function filterLotteryByType(lotteryList: Lottery[], type: LotteryType): Lottery[] {
//   return lotteryList.filter((tx: Lottery) => tx.type === type);
// }

// function filterLotteryByDateRange(lotteryList: Lottery[], startDate: number = 0, endDate: number = Number.MAX_SAFE_INTEGER): Lottery[] {
//   return lotteryList.filter((tx: Lottery) =>
//     tx.time >= startDate &&
//     tx.time <= endDate,
//   );
// }

// function filterLotteryByFilters(lotteryList: Lottery[], filters: LotteryFilters) {

//   let filteredTxs: Lottery[] = lotteryList; // lotteryList.slice(0);

//   if (filters.address) {
//     filteredTxs = filterLotteryByAddress(filteredTxs, filters.address);
//   }

//   if (filters.from) {
//     filteredTxs = filterLotteryByFrom(filteredTxs, filters.from);
//   }

//   if (filters.to) {
//     filteredTxs = filterLotteryByTo(filteredTxs, filters.to);
//   }

//   if (filters.type) {
//     filteredTxs = filterLotteryByType(filteredTxs, filters.type);
//   }

//   if (filters.startDate || filters.endDate) {
//     filteredTxs = filterLotteryByDateRange(filteredTxs, filters.startDate, filters.endDate);
//   }

//   return filteredTxs;
// }

export default {
  namespaced: true,
  state: {
    lotteryList: new Array<Lottery>(),
  },
  getters: {
    lotteryList: (state: any) => state.lotteryList,
    // lotteryListByAddress: (state: any) => (addr: address) => filterLotteryByAddress(state.lotteryList, addr),
    // lotteryListByFrom: (state: any) => (addr: address) => filterLotteryByFrom(state.lotteryList, addr),
    // lotteryListByTo: (state: any) => (addr: address) => filterLotteryByTo(state.lotteryList, addr),
    // lotteryListByType: (state: any) => (type: LotteryType) => filterLotteryByType(state.lotteryList, type),
    // lotteryListByDateRange: (state: any) => (startDate: number, endDate: number) => filterLotteryByDateRange(state.lotteryList, startDate, endDate),
    // lotteryListByFilters: (state: any) => (filters: LotteryFilters) => filterLotteryByFilters(state.lotteryList, filters),
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
    async fetchLottery({ commit }: any, filters: LotteryFilters) {
      const response: LotteryList = await lotteryService.getLotteryList(filters);
      commit('addLottery', response);
    },
    async newLottery({ commit, dispatch, rootGetters }: any, lottery: NewLotteryModel) {
      const response: string = await lotteryService.newLottery({
        address: 'TTarN3iszzfkh2j4doWHsMw3LxJJrq25',
        privateKey: '002313549d166b9d6e4781504dfa8b4bd5a03056f226dca3c5d1e21783e4e0d1ee',
      }, lottery);

      console.log('pending tx => ', response);

      await new Promise((resolve) => {

        setTimeout(async () => {
          await dispatch('fetchLottery');
          resolve();
        }, 1000 * 10);
        // commit('addLottery', response);

      });

    },
  },
};
