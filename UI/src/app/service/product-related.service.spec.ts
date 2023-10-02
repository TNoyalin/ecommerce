import { TestBed } from '@angular/core/testing';

import { ProductRelatedService } from './product-related.service';

describe('ProductRelatedService', () => {
  let service: ProductRelatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRelatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
