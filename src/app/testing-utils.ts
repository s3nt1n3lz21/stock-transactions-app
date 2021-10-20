import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Data } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Subject, Observable, of } from "rxjs";
import { ApiService } from "./api.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewTransaction, Transaction } from "./ITransaction";

const MockActivatedRoute = {
    _paramsSubject: new Subject(),
    firstChild: {
        data: new Observable<Data>()
    },
    paramMap: new Subject(),
    get params() { return this._paramsSubject.asObservable(); },
    get parent() { return {}; },
    get children() { return []; },
    queryParams: of({}),
    routeConfig: {},
    snapshot: {
        data: {},
        routeConfig: {
            children: [
                {
                    data: {},
                },
            ],
        },
        firstChild: {
            url: [{ path: '/path' }]
        },
    },
    url: new Subject()
};

class HttpClientMock {
    public get = () => of(0);
    public post = () => of(0);
    public delete = () => of(0);
    public put = () => of(0);
}

class ApiServiceMock {
    public updateTransaction = (transaction) => of(0);
    public createTransaction = (transaction) => of(0);
    public deleteTransaction = (transactionId) => of(0);
    public getTransactions = () => of({ transactions: transactions});
}

export const transactions: Transaction[] = [
    {
      "cashflow": 32000,
      "date": "2019-01-01T09:45:00.000Z",
      "id": 5,
      "type": "deposit",
      "value": 32000
    },
    {
      "cashflow": -5005,
      "date": "2019-01-02T09:34:02.000Z",
      "id": 17,
      "security": "Carr's",
      "shares": 317,
      "type": "buy",
      "value": 5005
    },
    {
      "cashflow": -808,
      "date": "2019-01-02T10:05:16.345Z",
      "id": 24,
      "security": "Britvic",
      "shares": 618,
      "type": "buy",
      "value": 808
    },
    {
      "cashflow": -261,
      "date": "2019-01-02T11:15:55.038Z",
      "id": 25,
      "security": "J Sainsbury",
      "shares": 19,
      "type": "buy",
      "value": 261
    },
    {
      "cashflow": -209,
      "date": "2019-01-02T12:00:45.358Z",
      "id": 29,
      "security": "Scs",
      "shares": 23,
      "type": "buy",
      "value": 209
    },
    {
      "cashflow": -116,
      "date": "2019-01-02T14:30:00.155Z",
      "id": 33,
      "security": "Pets At Home",
      "shares": 42,
      "type": "buy",
      "value": 116
    },
    {
      "cashflow": -240,
      "date": "2019-01-02T15:59:40.111Z",
      "id": 35,
      "security": "Bt",
      "shares": 20,
      "type": "buy",
      "value": 240
    },
    {
      "cashflow": 227,
      "date": "2019-02-04T10:30:55.999Z",
      "id": 101,
      "security": "Scs",
      "shares": -50,
      "type": "sell",
      "value": 227
    },
    {
      "cashflow": -2920,
      "date": "2019-02-05T10:00:00.000Z",
      "id": 115,
      "security": "Games Workshop",
      "shares": 90,
      "type": "buy",
      "value": 2920
    },
    {
      "cashflow": 2965,
      "date": "2019-02-05T10:01:09.835Z",
      "id": 116,
      "security": "Games Workshop",
      "shares": -60,
      "type": "sell",
      "value": 2965
    },
    {
      "cashflow": -2955,
      "date": "2019-02-05T11:23:11.235Z",
      "id": 120,
      "security": "Games Workshop",
      "shares": 75,
      "type": "buy",
      "value": 2955
    },
    {
      "cashflow": 206,
      "date": "2019-05-04T12:18:55.813Z",
      "id": 245,
      "security": "Bt",
      "shares": -15,
      "type": "sell",
      "value": 206
    },
    {
      "cashflow": -1000,
      "date": "2019-11-13T12:03:17.584Z",
      "id": 596,
      "type": "withdrawal",
      "value": 1000
    },
    {
      "cashflow": 193,
      "date": "2019-11-27T15:59:07.054Z",
      "id": 601,
      "security": "Bt",
      "shares": -4,
      "type": "sell",
      "value": 193
    },
    {
      "cashflow": 158,
      "date": "2019-12-12T14:08:19.954Z",
      "id": 665,
      "security": "Carr's",
      "shares": -31,
      "type": "sell",
      "value": 158
    },
    {
      "cashflow": 228,
      "date": "2020-01-29T09:49:37.185Z",
      "id": 798,
      "security": "Pets At Home",
      "shares": -128,
      "type": "sell",
      "value": 228
    },
    {
      "cashflow": -550,
      "date": "2020-01-29T09:50:28.009Z",
      "id": 799,
      "type": "withdrawal",
      "value": 550
    }
  ]

export const newTransaction: NewTransaction = {
    type: 'buy',
    date: '20-10-2021',
    value: 10,
    cashflow: 100,
};

export const transaction: Transaction = {
    cashflow: 32000,
    date: "2019-01-01T09:45:00.000Z",
    id: 5,
    type: "deposit",
    value: 32000
};

export const updatedTransaction: Transaction = {
    cashflow: 1111,
    date: "2019-01-01T09:45:00.000Z",
    id: 5,
    type: "deposit",
    value: 1111
};

export const configureTestingModule = ({
    imports = [],
    declarations = [],
    providers = [],
    routes = [],
    activatedRoute = MockActivatedRoute,
}) => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...imports
    ],
    declarations: [
        AppComponent,
        ...declarations
    ],
    providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        { provide: HttpClient, useClass: HttpClientMock },
        Injector,
        ...providers
    ],
});