import { ChartPoint } from "./chart-point";

export class ChartItem {
    constructor(name: string, color: string, ...chartPoints: ChartPoint[]) {
        this.points = chartPoints;
        this.isVisible = true;
        this.name = name;
        this.color = color;
    }

    clone(): ChartItem {
        const chartItem = new ChartItem(this.name, this.color, ...this.points.map(point => point.clone()));
        chartItem.isVisible = this.isVisible;
        return chartItem;
    }

    points: ChartPoint[];
    path: string = "";

    isVisible: boolean;

    name: string;
    color: string;

    setPath (height: number, length: number, previousItem: ChartItem) {
        this.points.forEach((point, pointIndex) => {
            point.update(pointIndex, height, previousItem == null ? 0 : previousItem.points[pointIndex].y);
            if (pointIndex == 0) {
                this.path = "M 0 " + point.y;
            }
            this.path += " L " + point.x + " " + point.y;
        });
        if (previousItem == null) {
            this.path += " L " + length + " 0";
            this.path += " L 0 0";
        } else {
            previousItem.points.slice().reverse().forEach(point => {
                this.path += " L " + point.x + " " + point.y;
            });
            this.path += " L 0 " + previousItem.points[0].y;
        }
    }
}
