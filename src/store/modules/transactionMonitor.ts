export type TransactionStatusStatus = 'pending' | 'mined' | 'error';

export interface TransactionStatus {
  status: TransactionStatusStatus;
  hash: string;
  title: string;
  date: number;
  blockHeight?: number;
  error?: string;
}

export type TransactionStatusCollection = Record<string, TransactionStatus>;

export default {
  namespaced: true,
  state: {
    transactions: {} as TransactionStatusCollection,
  },
  getters: {
    transactions: (state: any) => Object.values(state.transactions),
  },
  mutations: {
    setTransaction(state: any, payload: TransactionStatus) {
      state.transactions = { ...state.transactions, [payload.hash]: payload };
    },
    removeTransaction(state: any, payload: string) {
      const newTransactions = { ...state.transactions };
      delete newTransactions[payload];
      state.transactions = newTransactions;
    },
  },
};
