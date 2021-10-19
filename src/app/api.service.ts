import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private _http: HttpClient,
    ) {}

    public getTransactions(): Observable<any> {
        const _url = `https://transactions-challenge.test.stockopedia.com//api/v1/transactions`;
        return this._http.get(_url);
    }
}
// Further work could include:
// Caching api responses and prevent calling the api again only every 15 min etc
// Having a baseURL and Adding parameters to the getTransactions function to narrow down results e.g. for particular portfolios