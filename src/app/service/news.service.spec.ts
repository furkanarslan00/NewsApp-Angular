import { TestBed } from '@angular/core/testing';

import { NewsApiService } from './news.service';

describe('NewsService', () => {
  let service: NewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
