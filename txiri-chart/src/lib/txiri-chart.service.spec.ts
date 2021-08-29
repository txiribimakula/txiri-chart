import { TestBed } from '@angular/core/testing';

import { TxiriChartService } from './txiri-chart.service';

describe('TxiriChartService', () => {
  let service: TxiriChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TxiriChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
