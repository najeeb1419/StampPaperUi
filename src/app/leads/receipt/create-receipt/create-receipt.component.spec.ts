import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReceiptComponent } from './create-receipt.component';

describe('CreateReceiptComponent', () => {
  let component: CreateReceiptComponent;
  let fixture: ComponentFixture<CreateReceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReceiptComponent]
    });
    fixture = TestBed.createComponent(CreateReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
