import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDeleteConfirmComponent } from './transaction-delete-confirm.component';

describe('TransactionDeleteConfirmComponent', () => {
  let component: TransactionDeleteConfirmComponent;
  let fixture: ComponentFixture<TransactionDeleteConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionDeleteConfirmComponent]
    });
    fixture = TestBed.createComponent(TransactionDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
