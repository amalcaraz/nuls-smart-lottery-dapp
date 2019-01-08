import { Account, AddressType, ChainIdType } from 'nuls-js';
import { NulsAccount } from '../model/common';
import config from 'config';

const net: ChainIdType = config.app.net === 'testnet' ? ChainIdType.Testnet : ChainIdType.Mainnet;

export function login(privateKey: string): NulsAccount {

  const account = new Account().import(privateKey, undefined, AddressType.Default, net);

  return {
    address: account.address,
    privateKey: account.prikey,
  };

}
