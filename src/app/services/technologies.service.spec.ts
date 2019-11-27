import { TestBed } from '@angular/core/testing';

import { TechnologiesService } from './technologies.service';

describe('TechnologiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnologiesService = TestBed.get(TechnologiesService);
    expect(service).toBeTruthy();
  });
});
