import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOverviewByPiggybankComponent } from './transaction-overview-by-piggybank.component';

describe('TransactionOverviewByPiggybankComponent', () => {
  let component: TransactionOverviewByPiggybankComponent;
  let fixture: ComponentFixture<TransactionOverviewByPiggybankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionOverviewByPiggybankComponent]
    });
    fixture = TestBed.createComponent(TransactionOverviewByPiggybankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
