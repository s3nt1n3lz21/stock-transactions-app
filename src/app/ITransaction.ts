import { FormGroup } from "@angular/forms";

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

export function emptyTransaction(): Transaction {
    return {
        id: 0,
        type: TransactionType.Buy,
        date: '',
        value: 0,
        cashflow: 0,
        security: '', // name of stock
        shares: 0,
    };
}

export interface TransactionFormValues {
    type: TransactionType;
    date: string;
    value: number;
    security: string; // name of stock
    shares: number;
}
  
export interface TransactionForm extends FormGroup {
    value: TransactionFormValues;
}