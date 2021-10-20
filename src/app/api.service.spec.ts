import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';


import { configureTestingModule, newTransaction, transaction } from 'src/app/testing-utils';
import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;

    beforeEach(waitForAsync(() => {
        configureTestingModule({
            providers: [ApiService]
        });

        service = TestBed.inject(ApiService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call the correct api for getting all the transactions', () => {
        const httpClient = TestBed.inject(HttpClient);
        const spy = spyOn(httpClient, 'get');

        service.getTransactions();

        expect(spy).toHaveBeenCalledWith('https://transactions-challenge.test.stockopedia.com//api/v1/transactions');
    });

    it('should call the correct api for creating a transaction', () => {
        const httpClient = TestBed.inject(HttpClient);
        const spy = spyOn(httpClient, 'post');

        service.createTransaction(newTransaction);

        expect(spy).toHaveBeenCalledWith('https://transactions-challenge.test.stockopedia.com//api/v1/transactions');
    });

    it('should call the correct api for deleting a transaction', () => {
        const httpClient = TestBed.inject(HttpClient);
        const spy = spyOn(httpClient, 'delete');

        service.deleteTransaction(transaction.id.toString());

        expect(spy).toHaveBeenCalledWith('https://transactions-challenge.test.stockopedia.com//api/v1/transactions');
    });

    it('should call the correct api for updating a transaction', () => {
        const httpClient = TestBed.inject(HttpClient);
        const spy = spyOn(httpClient, 'put');

        service.updateTransaction(transaction);

        expect(spy).toHaveBeenCalledWith('https://transactions-challenge.test.stockopedia.com//api/v1/transactions');
    });
});



function HTTPClient(HTTPClient: any): any {
    throw new Error('Function not implemented.');
}
// Further Tests To Write