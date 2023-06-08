import { Figure, Point, Edge, Polygon } from "../Entitys";

export default class Tor extends Figure {
    constructor({
        innerRadius = 20,
        radius = 10,
        count = 20,
        color = '#44ddee',
        center,
    }) {
        super({ color, center,});

        this.innerRadius = innerRadius;
        this.radius = radius;
        this.count = count;

        this.createFigure()
    }

    createPoints() {
        const sizeProp = 0.5;
        const prop = 2 * Math.PI / this.count;
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.center.x + sizeProp * (this.innerRadius + this.radius * Math.cos(i * prop)) * Math.cos(j * prop),
                    this.center.y + sizeProp * this.radius * Math.sin(i * prop),
                    this.center.z + sizeProp * (this.innerRadius + this.radius * Math.cos(i * prop)) * Math.sin(j * prop),
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
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i, this.points.length - this.count + i));
        }
    }

    createPolygon() {
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

            this.polygons.push(new Polygon([
                i,
                this.points.length - this.count + i,
                this.points.length - this.count + i + 1,
                i + 1,
            ], this.color))
        }

        this.polygons.push(new Polygon([
            this.points.length - 1,
            this.points.length - this.count,
            0,
            this.count - 1,
        ], this.color));
    }
}