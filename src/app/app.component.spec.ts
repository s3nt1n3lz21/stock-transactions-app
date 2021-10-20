import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { configureTestingModule, transaction, transactions, updatedTransaction } from './testing-utils';

import cloneDeep from 'lodash/cloneDeep';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    configureTestingModule({
        declarations: [
            AppComponent,
        ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should add a transaction to the transactions list when adding a transaction', () => {
    component.transactions = cloneDeep(transactions);

    component.createTransaction(transaction);

    expect(component.transactions).toContain(cloneDeep(transaction));
    expect(component.transactions.length).toEqual(transactions.length + 1);
  });

  it('should remove the transaction from the transactions list when deleting a transaction', () => {
    component.transactions = cloneDeep(transactions);

    component.deleteTransaction(transaction.id.toString());

    expect(component.transactions).not.toContain(cloneDeep(transaction));
    expect(component.transactions.length).toEqual(transactions.length - 1);
  });

  it('should update a transaction in the transactions list when updating a transaction', () => {
    component.transactions = cloneDeep(transactions);

    component.updateTransaction(updatedTransaction);

    expect(component.transactions).toContain(cloneDeep(updatedTransaction));
    expect(component.transactions.length).toEqual(transactions.length);
  });

  it('should fill the transaction list when initialising the component', fakeAsync(() => {
    tick();
    
    expect(component.transactions).toEqual(cloneDeep(transactions));
  }));

  // HTML
  it('should display the correct number of transactions', () => {

  });
});

  // Further Tests To Write
  // Tests to check the form of the api requests are all okay
  // Tests to check each button calls the right function
  // Tests to check value and cashflow are displayed in the right form in the table
  // Check notifications are displayed when editing, adding, deleting transactions
  // Check we handle errors correctly
