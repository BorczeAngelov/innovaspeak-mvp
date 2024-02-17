import { TestBed } from '@angular/core/testing';

import { VoxCallWrapperService } from './vox-call-wrapper.service';

describe('VoxCallWrapperService', () => {
  let service: VoxCallWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoxCallWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
