import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggybankDeleteConfirmComponent } from './piggybank-delete-confirm.component';

describe('PiggybankDeleteConfirmComponent', () => {
  let component: PiggybankDeleteConfirmComponent;
  let fixture: ComponentFixture<PiggybankDeleteConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiggybankDeleteConfirmComponent]
    });
    fixture = TestBed.createComponent(PiggybankDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
