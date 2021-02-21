import { TestBed, async, inject } from '@angular/core/testing';

import { SercureInnerPagesGuard } from './sercure-inner-pages.guard';

describe('SercureInnerPagesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SercureInnerPagesGuard]
    });
  });

  it('should ...', inject([SercureInnerPagesGuard], (guard: SercureInnerPagesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
