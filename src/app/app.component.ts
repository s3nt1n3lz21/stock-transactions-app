import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _apiService: ApiService,
  ) {}

  ngOnInit() {
    this._apiService.getTransactions().subscribe((response: { transactions: Transaction[]}) => {
      this.transactions = response.transactions;
      console.log('transactions: ', this.transactions);
    })
  }

  createTransaction() {
    // this._apiService.createTransaction(transaction).subscribe((response) => {
    //   console.log('response: ', response);
    // })
  }

  updateTransaction() {
    // this._apiService.updateTransaction(transaction).subscribe((response) => {
    //   console.log('response: ', response);
    // })
  }

  deleteTransaction() {
    // this._apiService.deleteTransaction(transactionId).subscribe((response) => {
    //   console.log('response: ', response);
    // })
  }
}
