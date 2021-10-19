import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { Transaction } from './ITransaction';


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

  transactionForm = this._fb.group({
    date: '',
    type: '',
    security: '',
    shares: 0,
    value: 0,
  });

  // 

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

  createTransaction(transaction: Transaction) {
    this._apiService.createTransaction(transaction).subscribe((response) => {
      console.log('response: ', response);
    })
  
    this.showAddedAlert = true;
    setTimeout(() => {
      this.showAddedAlert = false;
    }, 3000);
  }

  updateTransaction(transaction: Transaction) {
    this._apiService.updateTransaction(transaction).subscribe((response) => {
      console.log('response: ', response);
    })
    
    this.showUpdatedAlert = true;
    setTimeout(() => {
      this.showUpdatedAlert = false;
    }, 3000);
  }

  deleteTransaction(transactionId: string) {
    this._apiService.deleteTransaction(transactionId).subscribe((response) => {
      console.log('response: ', response);
    })

    this.showDeletedAlert = true;
    setTimeout(() => {
      this.showDeletedAlert = false;
    }, 3000);
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
      this.updateTransaction(this.transactionForm.value);
    } else {
      this.createTransaction(this.transactionForm.value);
    }

    this.recalculateCashflow();
  }

  // Further work could include:
  // Form validation
  // Add a confirmation of transaction deletion modal

  // Todo
  // Recalculate cashflow for a transaction when editing it
}
