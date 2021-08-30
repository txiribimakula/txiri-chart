export class ChartPoint {
    constructor(year: number, month: number, factor: number = 1) {
        this.factor = factor;
        this.date = new Date(year, month);
    }

    clone(): ChartPoint {
        const point = new ChartPoint(this.date.getFullYear(), this.date.getMonth(), this.factor);
        point.factorSum = this.factorSum;
        return point;
    }

    date: Date;

    factor: number;

    factorSum: number = 0;

    x: number = 0;
    y: number = 0;

    update(index: number, height: number, yIncrement: number): void {
        this.x = (index * 10) + 10;
        this.y = this.factor * (height / this.factorSum) + yIncrement;
    }

    isInRange(start: Date, end: Date): boolean {
        return (this.date.getFullYear() > start.getFullYear() ||
            (this.date.getFullYear() == start.getFullYear() && this.date.getMonth() >= start.getMonth())) &&
            (this.date.getFullYear() < end.getFullYear() ||
            (this.date.getFullYear() == end.getFullYear() && this.date.getMonth() <= end.getMonth()))
    }
}