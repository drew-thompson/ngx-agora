import { TestBed } from '@angular/core/testing';

import { NgxAgoraService } from './ngx-agora.service';

describe('NgxAgoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxAgoraService = TestBed.get(NgxAgoraService);
    expect(service).toBeTruthy();
  });
});
