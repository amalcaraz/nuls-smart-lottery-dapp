import { AxiosResponse } from 'axios';
import { address, na } from '../model/common';
import { naToNuls, nulsToNa } from 'nuls-js';
import config from 'config';
import { Lottery } from '@/model/lottery';

export { naToNuls, nulsToNa };

export { isValidAddress, isValidPrivateKey } from 'nuls-js';

export function checkResponse<T>(response: AxiosResponse<T>): T {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

export function getQueryString(data: { [k: string]: any }): string {
  const query: string = Object.keys(data).map((k: string) => `${k}=${data[k]}`).join('&');
  return query ? `?${query}` : '';
}

export function naToNulsFixed(nuls: na, fixed: number = 2): number {
  const res: number = naToNuls(nuls);
  const fixedBase: number = Math.pow(10, fixed);
  return (Math.round(res * fixedBase) / fixedBase);
}

export function nulsWorldAddressUrl(addr: address, contract: boolean = false) {
  return `${config.app.nulsWorldUrl}/addresses${contract ? '/contracts' : ''}/${addr}`;
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