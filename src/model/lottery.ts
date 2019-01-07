import { address, na, dateNumber } from './common';

export enum LotteryStatus {
  WAITING = 0,
  OPEN = 1,
  CLOSE = 2,
}

export interface Lottery {
  id: number;
  title: string;
  desc: string;
  status: LotteryStatus;
  minParticipants: number;
  startTime: dateNumber;
  endTime: dateNumber;
  initialPot: na;
  currentPot: na;
  totalPot: na;
  ticketPrice: na;
  secondPrizes: boolean;
  creatorAddress: address;
  supportAddress: address;
  supportPercentage: number;
}

export interface NewLotteryModel {
  title: string;
  desc: string;
  minParticipants: number;
  startTime: dateNumber;
  endTime: dateNumber;
  initialPot: na;
  ticketPrice: na;
  secondPrizes: boolean;
  supportAddress?: address;
  supportPercentage?: number;
}

export type LotteryList = Lottery[];
export type LotteryFilters = any;
