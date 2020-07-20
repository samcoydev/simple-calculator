import { TestBed } from '@angular/core/testing';

import { HistoryStoreService } from './history-store.service';

describe('HistoryStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoryStoreService = TestBed.get(HistoryStoreService);
    expect(service).toBeTruthy();
  });
});
