import { TestBed } from '@angular/core/testing';

import { BaggageService } from './baggage.service';

describe('BaggageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaggageService = TestBed.get(BaggageService);
    expect(service).toBeTruthy();
  });
});
