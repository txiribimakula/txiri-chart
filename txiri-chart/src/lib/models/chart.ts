import { ChartItem } from "./chart-item";

export class Chart {
    constructor(...items: ChartItem[]) {
        this.originalItems = items;
        this.items = items.map(item => item.clone());

        this.originalItems.forEach(item => {
            item.points.forEach(point => {
                if (this.minDate == null || point.date < this.minDate) {
                    this.minDate = point.date;
                }
                if (this.maxDate == null || point.date > this.maxDate) {
                    this.maxDate = point.date;
                }
            });
        });
    }

    clone(): Chart {
        return new Chart(...this.items.map(item => item.clone()));
    }

    items: ChartItem[];

    length: number = 0;
    height: number = 0;

    minDate: Date = new Date(2014, 9);
    maxDate: Date = new Date(2016, 12);

    originalItems: ChartItem[];

    onRangeChange(rangeStartDate: Date, rangeEndDate: Date) {
        if (rangeStartDate && rangeEndDate) {
            this.items.forEach((item, index) => {
                item.points = this.originalItems[index].points.filter(point =>
                    point.isInRange(rangeStartDate, rangeEndDate)
                ).slice();
            });
            this.generate();
        }
    }

    generate() {
        this.length = this.items[0].points.length * 10;
        this.height = 0;

        for (let index = 0; index < this.length / 10; index++) {
            let value = 0;
            this.items.forEach(item => {
                value += item.points[index].factor;
            });
            this.items.forEach(item => {
                item.points[index].factorSum = value;
            });
            if (this.height == 0) {
                this.height = value;
            } else {
                this.height = this.lcm(this.height, value);
            }
        }
        this.height *= 10;

        var previousItem: ChartItem | null = null;
        this.items.forEach(item => {
            item.setPath(this.height, this.length, previousItem);
            previousItem = item;
        });
    }

    lcm = (n1: number, n2: number) => {
        if (n1 == n2) {
            return n1;
        }
        let max = Math.max(n1, n2);
        let min = Math.min(n1, n2);

        let i = max;
        while (i % min !== 0) {
            i += max;
        }
        return i;
    }

    toggleItemVisibility(item: ChartItem) {
        item.isVisible = !item.isVisible;
        this.items = this.originalItems.map(item => item.clone()).filter(item => item.isVisible);
        this.generate();
    }
}