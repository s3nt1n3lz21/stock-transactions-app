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
    public get = (path) => of(0);
    public post = () => {};
}

class ApiServiceMock {

}

export const newTransaction: NewTransaction = {
    type: 'buy',
    date: '20-10-2021',
    value: 10,
    cashflow: 100,
};

export const transaction: Transaction = {
    id: 999,
    type: 'buy',
    date: '20-10-2021',
    value: 10,
    cashflow: 100,
}

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