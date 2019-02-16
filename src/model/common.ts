export type address = string;
export type na = number;
export type dateNumber = number;
export interface NulsAccount {
  address: address;
  privateKey: string;
}

export interface AppNotificationModel {
  message: string;
  kind: 'success' | 'info' | 'error';
  timeout: number;
}
