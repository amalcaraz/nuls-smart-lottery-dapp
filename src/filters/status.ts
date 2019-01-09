import { LotteryStatus, Lottery } from './../model/lottery';
import Vue from 'vue';
import { isLotteryWaitingToBeResolved, isLotteryOpenYet } from '@/services/lottery';

Vue.filter('lotteryStatus', (lottery: Lottery) => {

  if (isLotteryWaitingToBeResolved(lottery)) {
    return 'Waiting to be resolved';
  }

  if (isLotteryOpenYet(lottery)) {
    return 'Open';
  }

  switch (lottery.status) {
    case LotteryStatus.WAITING:
      return 'Waiting';
    case LotteryStatus.OPEN:
      return 'Open';
    case LotteryStatus.CLOSED:
      return 'Closed';
    default:
      return '';
  }

});
