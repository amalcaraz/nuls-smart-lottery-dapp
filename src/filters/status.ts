import { LotteryStatus } from './../model/lottery';
import Vue from 'vue';

Vue.filter('lotteryStatus', (value: LotteryStatus) => {

  switch (value) {
    case LotteryStatus.WAITING:
      return 'Waiting';
    case LotteryStatus.OPEN:
      return 'Open';
    case LotteryStatus.CLOSE:
      return 'Close';
    default:
      return '';
  }

});
