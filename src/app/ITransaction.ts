import { FormGroup } from "@angular/forms";

export type TransactionType = 'buy' | 'sell' | 'deposit' | 'withdrawal';
export interface Transaction {
    id: number;
    type: TransactionType;
    date: string;
    value: number;
    cashflow: number;
    security?: string; // name of stock
    shares?: number;
}

export interface NewTransaction {
    type: TransactionType,
    date: string,
    value: number,
    cashflow: number,
    security?: string; // name of stock
    shares?: number;
}

export function emptyTransaction(): NewTransaction {
    return {
        type: 'buy',
        date: '',
        value: 0,
        cashflow: 0,
    };
}

export interface TransactionFormValues {
    type: 'Buy' | 'Sell' | 'Withdraw' | 'Deposit';
    date: string;
    value: number;
    security: string; // name of stock
    shares: number;
}
  
export interface TransactionForm extends FormGroup {
    value: TransactionFormValues;
}