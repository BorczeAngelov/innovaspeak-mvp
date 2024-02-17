import { TestBed } from '@angular/core/testing';

import { MemberfulDataService } from './memberful-data.service';

describe('MemberfulDataService', () => {
  let service: MemberfulDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberfulDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
