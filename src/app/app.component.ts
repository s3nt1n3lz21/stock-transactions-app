import { Component, OnInit } from '@angular/core';
import { Transaction } from './ITransaction';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-transactions-app';
  transactions: Transaction[];

  constructor() {}

  ngOnInit() {
    this.apiService.getTransactions().subscribe((transactions) => {

    })
  }
}
