import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { emptyTransaction, NewTransaction, Transaction, TransactionForm, TransactionFormValues, TransactionType } from './ITransaction';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-transactions-app';
  transactions: Transaction[] = [];
  cumulativeCashflow: number;
  editMode: boolean = false;
  selectedTransaction: Transaction;

  showAddedAlert: boolean = false;
  showUpdatedAlert: boolean = false;
  showDeletedAlert: boolean = false;

  constructor(
    private _apiService: ApiService,
    private _fb: FormBuilder
  ) {}

  transactionForm: TransactionForm = this._fb.group({
    date: '',
    type: '',
    security: '',
    shares: 0,
    value: 0,
  });

  ngOnInit() {
    this._apiService.getTransactions().subscribe((response: { transactions: Transaction[]}) => {
      this.transactions = response.transactions;
      this.recalculateCashflow();
      console.log('transactions: ', this.transactions);
    })
  }

  recalculateCashflow() {
    let cashflow = 0;
    this.transactions.forEach((transaction) => {
      cashflow += transaction.cashflow;
    });
    this.cumulativeCashflow = cashflow;
  }

  createTransaction() {
    const newTransaction: NewTransaction = emptyTransaction();

    console.log('form date: ', this.transactionForm.controls.date.value)

    newTransaction.date = new Date(this.transactionForm.controls.date.value).toISOString();
    newTransaction.type = this.convertTransactionTypeApi(this.transactionForm.controls.type.value);
    
    if (newTransaction.type == 'buy' || newTransaction.type == 'sell') {
      newTransaction.security = this.transactionForm.controls.security.value;
      newTransaction.shares = this.transactionForm.controls.shares.value;
    }
    
    newTransaction.value = this.transactionForm.controls.value.value*100;
    newTransaction.cashflow = this.calculateTransactionCashflow(newTransaction);

    this._apiService.createTransaction(newTransaction).subscribe(
      (response) => {
        console.log('response: ', response);

        const finalTransaction: Transaction = {
          ...newTransaction,
          ...{ id: response.id }
        }

        this.transactions.push(finalTransaction);
        this.showAddedAlert = true;
        setTimeout(() => {
          this.showAddedAlert = false;
        }, 3000);
      },
      (error) => {
        this.handleError(error);
      }
    )
  }

  updateTransaction() {
    const editedTransaction: Transaction = this.selectedTransaction;

    editedTransaction.date = this.transactionForm.controls.date.value;
    editedTransaction.type = this.convertTransactionTypeApi(this.transactionForm.controls.type.value);
    
    if (editedTransaction.type == 'buy' || editedTransaction.type == 'sell') {
      editedTransaction.security = this.transactionForm.controls.security.value;
      editedTransaction.shares = this.transactionForm.controls.shares.value;
    }
    
    editedTransaction.value = this.transactionForm.controls.value.value;
    editedTransaction.cashflow = this.calculateTransactionCashflow(editedTransaction);

    this._apiService.updateTransaction(editedTransaction).subscribe(
      (response) => {
        console.log('response: ', response);

        let index = this.transactions.findIndex((t) => t.id == this.selectedTransaction.id);
        this.transactions[index] = editedTransaction;

        this.showUpdatedAlert = true;
        setTimeout(() => {
          this.showUpdatedAlert = false;
        }, 3000);
      },
      (error) => {
        this.handleError(error);
      }
    )
  }

  deleteTransaction(transactionId: string) {
    this._apiService.deleteTransaction(transactionId).subscribe(
      (response) => {
        console.log('response: ', response);

        let index = this.transactions.findIndex((t) => t.id.toString() == transactionId);
        this.transactions.splice(index, 1);
        this.showDeletedAlert = true;
        setTimeout(() => {
          this.showDeletedAlert = false;
        }, 3000);
      },
      (error) => {
        this.handleError(error);
      }
    )
  }

  fillEditForm(transaction: Transaction) {
    this.selectedTransaction = transaction;
    this.transactionForm.controls.date.setValue(formatDate(transaction.date, 'yyyy-MM-dd', 'en-US'));
    this.transactionForm.controls.type.setValue(this.convertTransactionTypeForm(transaction.type));
    this.transactionForm.controls.security.setValue(transaction.security);
    this.transactionForm.controls.shares.setValue(transaction.shares);
    this.transactionForm.controls.value.setValue(transaction.value);
    this.editMode = true;
  }

  submit() {
    if (this.editMode) {
      this.updateTransaction();
    } else {
      this.createTransaction();
    }

    this.recalculateCashflow();
  }

  calculateTransactionCashflow(transaction: Transaction) {
    if (transaction.type == 'buy' || transaction.type == 'withdrawal') {
      return -transaction.value;
    } else {
      return transaction.value;
    }
  }

  handleError(error) {

  }

  isCashflowPositive(transaction: Transaction) {
    return transaction.cashflow > 0;
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  abs(number) {
    return Math.abs(number);
  }

  convertTransactionTypeApi(transactionType: string): TransactionType {
    switch(transactionType) { 
      case 'Withdraw': { 
         return 'withdrawal';
      }
      case 'Buy': { 
        return 'buy';
      }
      case 'Sell': { 
        return 'sell';
      }
      case 'Deposit': { 
        return 'deposit';
      }
   } 
  }

  convertTransactionTypeForm(transactionType: TransactionType): string {
    switch(transactionType) { 
      case 'withdrawal': { 
         return 'Withdraw';
      }
      case 'buy': { 
        return 'Buy';
      }
      case 'sell': { 
        return 'Sell';
      }
      case 'deposit': { 
        return 'Deposit';
      }
   } 
  }


  // Further work could include:
  // Form validation
  // Add a confirmation of transaction deletion modal
  // Show error message if updating/adding failed, finish handleError method
  // Add another input on the form for the time of the transaction
}
