import { TestBed } from '@angular/core/testing';

import { ClientHasPlansService } from './client-has-plans.service';

describe('ClientHasPlansService', () => {
  let service: ClientHasPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientHasPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
