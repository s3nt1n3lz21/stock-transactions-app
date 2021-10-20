import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { configureTestingModule } from './testing-utils';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    configureTestingModule({
        declarations: [
            AppComponent,
        ]
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('stock-transactions-app app is running!');
  // });
});

  // Todo
  // Add one test of each type

  // Further Tests To Write
  // Check adding a transaction adds to the list of transactions
  // Check updating a transaction updates the list of transactions
  // Tests to check the form of the api requests are all okay
  // Tests to check each button calls the right function
  // Tests to check value and cashflow are displayed in the right form in the table
  // Check notifications are displayed when editing, adding, deleting transactions
  // Check we handle errors correctly
