import { TestBed } from '@angular/core/testing';

import { GatwayService } from './gatway.service';

describe('GatwayService', () => {
  let service: GatwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
