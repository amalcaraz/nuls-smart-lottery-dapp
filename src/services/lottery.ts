import { BuyTicketsModel, LotteryDetail, Lottery, LotteryStatus } from './../model/lottery';
import config from 'config';
import { LotteryList, NewLotteryModel } from '../model/lottery';
import { Contract, TransactionHash } from 'nuls-js';
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

export async function getLotteryList(): Promise<LotteryList> {

  const contract: any = await getContract();
  return await contract.viewLotteryList();

}

export async function getLotteryDetail(lotteryId: number): Promise<LotteryDetail> {

  const contract: any = await getContract();
  return await contract.viewLotteryDetails(lotteryId.toString());

}

export async function newLottery(account: NulsAccount, lottery: NewLotteryModel): Promise<TransactionHash> {

  const contract: any = await getContract();

  if (lottery.supportAddress && lottery.supportPercentage) {

    return await contract.createLotteryWithSupportAddress(
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
      },
    );

  } else {

    return await contract.createLottery(
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
      },
    );

  }

}

export async function buyTickets(account: NulsAccount, tickets: BuyTicketsModel): Promise<TransactionHash> {

  const contract: any = await getContract();

  return await contract.buyTickets(
    tickets.id.toString(),
    {
      sender: account.address,
      privateKey: account.privateKey,
      value: (tickets.ticketsCount * tickets.ticketPrice) || 0,
    },
  );

}

export async function resolveLottery(account: NulsAccount, lotteryId: number): Promise<TransactionHash> {

  const contract: any = await getContract();

  return await contract.claimPrizes(
    lotteryId.toString(),
    {
      sender: account.address,
      privateKey: account.privateKey,
    },
  );

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

export function getLotteryStatus(lottey: Lottery): LotteryStatus {

  const now = moment();

  if (lottey.status !== LotteryStatus.CLOSED && now.isSameOrAfter(lottey.endTime, 'minutes')) {
    return LotteryStatus.WAITING_RESOLVE;
  }

  if (lottey.status === LotteryStatus.WAITING_OPEN && now.isSameOrAfter(lottey.startTime, 'minutes')) {
    return LotteryStatus.OPEN;
  }

  return lottey.status;

}
