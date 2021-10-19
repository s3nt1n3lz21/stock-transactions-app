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
  transactions: Transaction[];

  constructor(
    private _apiService: ApiService,
  ) {}

  ngOnInit() {
    this._apiService.getTransactions().subscribe((transactions) => {
      console.log('transactions: ', transactions);
    })
  }
}
