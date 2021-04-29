import { TestBed } from '@angular/core/testing';

import { ApiBeastService } from './api-beast.service';

describe('ApiBeastService', () => {
  let service: ApiBeastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBeastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
