import { TestBed } from '@angular/core/testing';

import { OrdinateurService } from './ordinateur.service';

describe('OrdinateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdinateurService = TestBed.get(OrdinateurService);
    expect(service).toBeTruthy();
  });
});
