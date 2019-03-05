import { LotteryStatus, Lottery } from '../model/lottery';
import Vue from 'vue';

Vue.filter('lotteryStatus', (lottery: Lottery) => {

  switch (lottery.status) {
    case LotteryStatus.WAITING_OPEN:
      return 'Waiting';
    case LotteryStatus.OPEN:
      return 'Open';
    case LotteryStatus.WAITING_RESOLVE:
      return 'Waiting to be resolved';
    case LotteryStatus.CLOSED:
      return 'Closed';
    default:
      return '';
  }

});
