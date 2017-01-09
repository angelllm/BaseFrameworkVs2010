/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ViewArticleDataService } from './view-article-data.service';

describe('ViewArticleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewArticleDataService]
    });
  });

  it('should ...', inject([ViewArticleDataService], (service: ViewArticleDataService) => {
    expect(service).toBeTruthy();
  }));
});
