import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAndFinanceComponent } from './accounts-and-finance.component';

describe('AccountsAndFinanceComponent', () => {
  let component: AccountsAndFinanceComponent;
  let fixture: ComponentFixture<AccountsAndFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsAndFinanceComponent]
    });
    fixture = TestBed.createComponent(AccountsAndFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
