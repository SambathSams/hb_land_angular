import { TestBed } from '@angular/core/testing';

import { LanddataService } from './landdata.service';

describe('LanddataService', () => {
  let service: LanddataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanddataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
