import { TestBed } from '@angular/core/testing';

import { PiggybankService } from './piggybank.service';

describe('PiggybankService', () => {
  let service: PiggybankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiggybankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
