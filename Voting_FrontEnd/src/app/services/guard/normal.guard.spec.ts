import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { normalGuard } from './normal.guard';

describe('normalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => normalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
