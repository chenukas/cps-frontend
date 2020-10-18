import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
