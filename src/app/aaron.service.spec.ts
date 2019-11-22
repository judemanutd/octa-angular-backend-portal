import { TestBed } from '@angular/core/testing';

import { AaronService } from './aaron.service';

describe('AaronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AaronService = TestBed.get(AaronService);
    expect(service).toBeTruthy();
  });
});
