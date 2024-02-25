import { TestBed } from '@angular/core/testing';

import { RealTimeCallTranscriptService } from './real-time-call-transcript.service';

describe('RealTimeCallTranscriptService', () => {
  let service: RealTimeCallTranscriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeCallTranscriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
