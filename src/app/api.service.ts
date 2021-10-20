import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from "./ITransaction";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private _http: HttpClient,
    ) {}

    public getTransactions(): Observable<{ transactions: Transaction[] }> {
        const _url = `https://transactions-challenge.test.stockopedia.com//api/v1/transactions`;
        return this._http.get<{ transactions: Transaction[] }>(_url);
    }

    public createTransaction(transaction: Transaction): Observable<Transaction> {
        const _url = `https://transactions-challenge.test.stockopedia.com//api/v1/transactions`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this._http.post<Transaction>(_url, transaction, { headers: headers });
    }

    public updateTransaction(transaction: Transaction): Observable<Transaction> {
        const _url = `https://transactions-challenge.test.stockopedia.com//api/v1/transactions/` + transaction.id;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this._http.put<Transaction>(_url, transaction, { headers: headers });
    }

    public deleteTransaction(transactionId: string) {
        const _url = `https://transactions-challenge.test.stockopedia.com//api/v1/transactions/` + transactionId;
        return this._http.delete(_url);
    }
}
// Further work could include:
// Caching api responses and prevent calling the api again only every 15 min etc
// Having a baseURL and Adding parameters to the getTransactions function to narrow down results e.g. for particular portfolios
// Adding authorisation to the headers

// Todo 
// Create response types