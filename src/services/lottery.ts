import { BuyTicketsModel, LotteryDetail } from './../model/lottery';
import config from 'config';
import { LotteryFilters, LotteryList, NewLotteryModel } from '../model/lottery';
import { Contract, TransactionHash } from 'nuls-js';
import { NulsAccount } from '../model/common';

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

// const contract: any = await Contract.at(config.app.contractAddress, { api: config.app.api.explorer });

// const fromAddress: string = 'TTarN3iszzfkh2j4doWHsMw3LxJJrq25';
// const privateKey: string = 'secret!';

// contract.account(fromAddress, privateKey);
// this.lotteryList = await contract.viewLotteryList();
