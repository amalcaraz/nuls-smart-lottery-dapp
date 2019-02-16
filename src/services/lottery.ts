import { BuyTicketsModel, LotteryDetail, Lottery, LotteryStatus } from './../model/lottery';
import config from 'config';
import { LotteryList, NewLotteryModel } from '../model/lottery';
import { Contract, TransactionReceipt, PromiEvent } from 'nuls-js';
import { NulsAccount, na } from '../model/common';
import moment from 'moment';

const api = config.app.api.explorer;

// tslint:disable-next-line:variable-name
let _contract: any;

async function getContract(): Promise<any> {

  if (!_contract) {
    _contract = await Contract.at(config.app.contractAddress, { api });
  }

  return Promise.resolve(_contract);

}

// function pipePromiEvent(source: PromiEvent<any>, target: PromiEvent<any>): void {

//   source.eventNames().forEach((event: string | symbol) => source.on(event, target.emit.bind(target)));
//   source.then(target.then.bind(target));
//   source.catch(target.catch.bind(target));

// }

export async function getLotteryList(): Promise<LotteryList> {

  const contract: any = await getContract();
  const lotteryList: LotteryList = await contract.viewLotteryList();

  return processLotteryListStatus(lotteryList);

}

export async function getLotteryDetail(lotteryId: number): Promise<LotteryDetail> {

  const contract: any = await getContract();
  const lotteryDetail: LotteryDetail = await contract.viewLotteryDetails(lotteryId.toString());

  return processLotteryListStatus([lotteryDetail])[0] as LotteryDetail;

}

export function newLottery(account: NulsAccount, lottery: NewLotteryModel, pe = new PromiEvent()): PromiEvent<TransactionReceipt> {

  getContract().then((contract) => {

    if (lottery.supportAddress && lottery.supportPercentage) {

      return contract.createLotteryWithSupportAddress(
        lottery.title.toString(),
        lottery.desc.toString(),
        lottery.ticketPrice.toString(),
        lottery.startTime.toString(),
        lottery.endTime.toString(),
        lottery.minParticipants.toString(),
        lottery.secondPrizes.toString(),
        lottery.supportAddress.toString(),
        lottery.supportPercentage.toString(),
        {
          sender: account.address,
          privateKey: account.privateKey,
          value: lottery.initialPot || 0,
          listener: pe,
        },
      );

    } else {

      return contract.createLottery(
        lottery.title.toString(),
        lottery.desc.toString(),
        lottery.ticketPrice.toString(),
        lottery.startTime.toString(),
        lottery.endTime.toString(),
        lottery.minParticipants.toString(),
        lottery.secondPrizes.toString(),
        {
          sender: account.address,
          privateKey: account.privateKey,
          value: lottery.initialPot || 0,
          listener: pe,
        },
      );

    }
  });

  return pe;

}

export function buyTickets(account: NulsAccount, tickets: BuyTicketsModel, pe = new PromiEvent()): PromiEvent<TransactionReceipt> {

  getContract().then((contract) => {

    return contract.buyTickets(
      tickets.id.toString(),
      {
        sender: account.address,
        privateKey: account.privateKey,
        value: (tickets.ticketsCount * tickets.ticketPrice) || 0,
        listener: pe,
      },
    );

  });

  return pe;

}

export function resolveLottery(account: NulsAccount, lotteryId: number, pe = new PromiEvent()): PromiEvent<TransactionReceipt> {

  getContract().then((contract) => {

    return contract.claimPrizes(
      lotteryId.toString(),
      {
        sender: account.address,
        privateKey: account.privateKey,
        listener: pe,
      },
    );

  });

  return pe;

}

export function getPrize(lottery: Lottery, prizeIndex: number): na {

  let totalPrize: na = lottery.totalPot;
  const prizes: na[] = [totalPrize, 0, 0];

  if (lottery.supportAddress) {
    totalPrize -= Math.ceil(totalPrize * lottery.supportPercentage / 100);
    prizes[0] = totalPrize;
  }

  if (lottery.secondPrizes) {

    prizes[1] = Math.ceil(totalPrize * 25 / 100);
    prizes[2] = Math.ceil(totalPrize * 10 / 100);

    prizes[0] = prizes[0] - prizes[1] - prizes[2];

  }

  return prizes[prizeIndex - 1];

}

function getLotteryStatus(lottey: Lottery): LotteryStatus {

  const now = moment();

  if (lottey.status !== LotteryStatus.CLOSED && now.isSameOrAfter(lottey.endTime, 'minutes')) {
    return LotteryStatus.WAITING_RESOLVE;
  }

  if (lottey.status === LotteryStatus.WAITING_OPEN && now.isSameOrAfter(lottey.startTime, 'minutes')) {
    return LotteryStatus.OPEN;
  }

  return lottey.status;

}

function processLotteryListStatus(lotteryList: Lottery[]): Lottery[] {

  lotteryList.forEach((lottery: Lottery) => lottery.status = getLotteryStatus(lottery));
  return lotteryList;

}
