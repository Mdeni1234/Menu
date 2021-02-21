import { TestBed, async, inject } from '@angular/core/testing';

import { DeActiveGuard } from './de-active.guard';

describe('DeActiveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeActiveGuard]
    });
  });

  it('should ...', inject([DeActiveGuard], (guard: DeActiveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
