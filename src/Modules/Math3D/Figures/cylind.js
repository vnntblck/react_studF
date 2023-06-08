import { Figure, Point, Edge, Polygon } from "../Entitys";

export default class Cylind extends Figure {
    constructor({
        color = '#44ddee',
        center,
        height = 20,
        count = 20,
        radius = 10,
        x, y, z
    }) {
        super({ color, center, x, y, z });
        this.count = count;
        this.radius = radius;
        this.height = height;

        this.createFigure();
    }

    createPoints() {
        const propI = this.height / this.count;
        const propJ = 2 * Math.PI / this.count;

        for (let i = -this.count / 2; i < this.count / 2; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.center.x + this.radius * Math.cos(j * propJ),
                    this.center.y + i * propI,
                    this.center.z + this.radius * Math.sin(j * propJ),
                ));
            }
        }
    }

    createEdges() {
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
            }
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
        }
    }

    createPolygon() {
        const polygons = [];
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));
            }

            this.polygons.push(new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color));
        }
    }
}