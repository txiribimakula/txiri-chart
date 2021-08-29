import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxiriChartComponent } from './txiri-chart.component';

describe('TxiriChartComponent', () => {
  let component: TxiriChartComponent;
  let fixture: ComponentFixture<TxiriChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxiriChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxiriChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
