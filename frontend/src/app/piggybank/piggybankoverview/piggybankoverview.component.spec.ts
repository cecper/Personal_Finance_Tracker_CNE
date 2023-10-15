import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggybankoverviewComponent } from './piggybankoverview.component';

describe('PiggybankoverviewComponent', () => {
  let component: PiggybankoverviewComponent;
  let fixture: ComponentFixture<PiggybankoverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiggybankoverviewComponent]
    });
    fixture = TestBed.createComponent(PiggybankoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
