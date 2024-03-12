import { TestBed } from '@angular/core/testing';

import { SalesleadService } from './saleslead.service';

describe('SalesleadService', () => {
  let service: SalesleadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesleadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
