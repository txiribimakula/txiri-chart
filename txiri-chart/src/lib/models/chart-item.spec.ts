import { ChartItem } from "./chart-item";

describe('TestChartItem', () => {
    var chartItem: ChartItem;

    beforeEach(() => {
        chartItem = new ChartItem("name", "red");
    })

    it('should be cloned', () => {
        expect(chartItem.clone()).toEqual(chartItem);
    });
});
