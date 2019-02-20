import { TestBed } from '@angular/core/testing';

import { TitleNameService } from './title-name.service';

describe('TitleNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleNameService = TestBed.get(TitleNameService);
    expect(service).toBeTruthy();
  });
});
