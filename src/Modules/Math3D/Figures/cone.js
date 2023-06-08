import { Figure, Point, Edge, Polygon } from "../Entitys";

export default class Cone extends Figure {
    constructor({
        radius = 10,
        height = 10,
        count = 20,
        color = '44ddee',
        center,
        x, y, z
    }) {
        super({ color, center, x, y, z });

        this.radius = radius;
        this.height = height;
        this.count = count;

        this.createFigure();
    }

    createPoints() {
        const propRadius = this.radius / this.count;
        const propAlpha = 2 * Math.PI / this.count;
        const propHeight = this.height / this.count;
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.center.x + i * propRadius * Math.cos(j * propAlpha),
                    this.center.y + i * propHeight,
                    this.center.z + i * propRadius * Math.sin(j * propAlpha),
                ))
            }
        }

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.center.x + i * propRadius * Math.cos(j * propAlpha),
                    this.center.y - i * propHeight,
                    this.center.z + i * propRadius * Math.sin(j * propAlpha),
                ))
            }
        }
    }

    createEdges() {
        for (let i = 0; i < this.count * 2; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(j + i * this.count, j + i * this.count + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j))
            }
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
            this.edges.push(new Edge(k, k + this.count));
        }
    }

    createPolygon() {
        for (let i = 0; i < this.count * 2 - 1; i++) {
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