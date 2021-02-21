import { TestBed } from '@angular/core/testing';

import { PesananService } from './pesanan.service';

describe('PesananService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PesananService = TestBed.get(PesananService);
    expect(service).toBeTruthy();
  });
});
