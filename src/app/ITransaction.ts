export enum TransactionType {
    Buy,
    Sell,
    Deposit,
    Withdrawal
  }
  export interface Transaction {
    id: number;
    type: TransactionType;
    date: string;
    value: number;
    cashflow: number;
    security?: string; // name of stock
    shares?: number;
  }
  