import { TestBed } from '@angular/core/testing';

import { CarGroupService } from './car-group.service';

describe('CarGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarGroupService = TestBed.get(CarGroupService);
    expect(service).toBeTruthy();
  });
});
