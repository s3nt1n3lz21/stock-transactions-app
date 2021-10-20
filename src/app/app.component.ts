import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { emptyTransaction, Transaction, TransactionForm, TransactionType } from './ITransaction';


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
    const newTransaction: Transaction = {
      ...emptyTransaction(),
      ...this.transactionForm.value
    };
    newTransaction.cashflow = this.calculateTransactionCashflow(newTransaction);
    newTransaction.type = this.convertTransactionTypeApi(newTransaction.type);

    this._apiService.createTransaction(newTransaction).subscribe(
      (response) => {
        console.log('response: ', response);
        this.transactions.push(newTransaction);
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
    const editedTransaction: Transaction = {
      ...this.selectedTransaction,
      ...this.transactionForm.value
    };
    editedTransaction.cashflow = this.calculateTransactionCashflow(editedTransaction);

    this._apiService.updateTransaction(editedTransaction).subscribe(
      (response) => {
        console.log('response: ', response);
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
    this.transactionForm.controls.date.setValue(transaction.date);
    this.transactionForm.controls.type.setValue(transaction.type);
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
    if (transaction.type == TransactionType.Buy || transaction.type == TransactionType.Withdrawal) {
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

  convertTransactionTypeApi(transactionType: string) {
    switch(transactionType) { 
      case 'Withdraw': { 
         return 'withdrawal'
      }
      default: { 
         return transactionType.toLowerCase();
      } 
   } 
  }


  // Further work could include:
  // Form validation
  // Add a confirmation of transaction deletion modal
  // Show error message if updating/adding failed, finish handleError method
  // Add another input on the form for the time of the transaction

  // Todo
  // Set the id of the transaction based on whats returned
  // Delete should remove it from our apps list if deletion successful
  // Add should add it to our apps list if successful
  // Update should update it on our app if successful api
  // Get dropdown showing correct value
  // Get date filling in the right value
  // Set data types of api responses
  // Add one test of each type
}
