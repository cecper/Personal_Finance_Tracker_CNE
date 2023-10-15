import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggybankcreateComponent } from './piggybankcreate.component';

describe('PiggybankcreateComponent', () => {
  let component: PiggybankcreateComponent;
  let fixture: ComponentFixture<PiggybankcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiggybankcreateComponent]
    });
    fixture = TestBed.createComponent(PiggybankcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
