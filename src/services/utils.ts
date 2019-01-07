import { AxiosResponse } from 'axios';
import { address, na } from '../model/common';
import { naToNuls, nulsToNa } from 'nuls-js';
import config from 'config';

export { naToNuls, nulsToNa };

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

export function isValidAddress(addr: address): boolean {
  return /^(Ns|TT)([a-zA-Z-0-9]{30})$/.test(addr);
}

export function nulsWorldAddressUrl(addr: address, contract: boolean = false) {
  return `${config.app.nulsWorldUrl}/addresses${contract ? '/contracts' : ''}/${addr}`;
}
