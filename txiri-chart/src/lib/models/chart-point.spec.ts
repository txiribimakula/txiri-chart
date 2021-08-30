import { DatePipe } from "@angular/common";
import { ChartPoint } from "./chart-point";

describe('TestChartPoint', () => {
    var chartPoint: ChartPoint;
    var datePipe = new DatePipe('en-US');

    beforeEach(() => {
        chartPoint = new ChartPoint(2021, 8);
        chartPoint.factorSum = 1;
    });

    [
        [new Date(2021, 7), new Date(2021, 9)],
        [new Date(2021, 8), new Date(2021, 9)],
        [new Date(2021, 7), new Date(2021, 8)],
        [new Date(2021, 8), new Date(2021, 8)],
        [new Date(2021, 6), new Date(2022, 3)],
        [new Date(2021, 6), new Date(2022, 7)],
        [new Date(2020, 9), new Date(2021, 8)]
    ].forEach(testCase => {
        it('should be in range of ' + datePipe.transform(testCase[0],"MM/yyyy") + ' and ' + datePipe.transform(testCase[1],"MM/yyyy"), () => {
            expect(chartPoint.isInRange(testCase[0], testCase[1])).toBeTrue();
        });
    });

    [
        [new Date(2021, 6), new Date(2021, 7)],
        [new Date(2021, 9), new Date(2021, 10)],
        [new Date(2020, 7), new Date(2020, 9)],
        [new Date(2022, 7), new Date(2022, 9)]
    ].forEach(testCase => {
        it('should NOT be in range of ' + datePipe.transform(testCase[0],"MM/yyyy") + ' and ' + datePipe.transform(testCase[1],"MM/yyyy"), () => {
            expect(chartPoint.isInRange(testCase[0], testCase[1])).toBeFalse();
        });
    });

    it('should be cloned', () => {
        expect(chartPoint.clone()).toEqual(chartPoint);
    });

    [
        {
            input: {index: 0, height: 50, yIncrement: 10},
            output: {x: 10, y: 60}
        },
        {
            input: {index: 0, height: 1, yIncrement: 0},
            output: {x: 10, y: 1}
        }
    ].forEach(testCase => {
        it('should update coordinates to (' + testCase.output.x + ', ' + testCase.output.y + ')', () => {
            // act
            chartPoint.update(testCase.input.index, testCase.input.height, testCase.input.yIncrement);
            // assert
            expect(chartPoint.x).toEqual(testCase.output.x);
            expect(chartPoint.y).toEqual(testCase.output.y);
        })
    });
});
