import { Figure, Point, Polygon, Edge } from "../Entitys";
export default class Ellips extends Figure {
    constructor({
        focusOx = 10,
        focusOy = 15,
        focusOz = 20,
        count = 20,
        color = '#44ddee',
        x, y, z }) {
        super({ color, x, y, z });

        this.focusOx = focusOx;
        this.focusOy = focusOy;
        this.focusOz = focusOz;
        this.count = count;

        this.createFigure();
    }

    createPoints() {
        const points = [];
        const propI = 2 * Math.PI / this.count;
        const propJ = Math.PI / this.count
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.x + this.focusOx * Math.sin(i * propI) * Math.cos(j * propJ),
                    this.y + this.focusOy * Math.cos(i * propI),
                    this.z + this.focusOz * Math.sin(i * propI) * Math.sin(j * propJ),
                ));
            }
        }
    }

    createEdges() {
        const edges = [];
        for (let i = 0; i < this.count; i++) {
            const k = i ? i - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(j + i * this.count, j + i * this.count + 1));
                this.edges.push(new Edge(j + i * this.count, j + k * this.count));
            }
            this.edges.push(new Edge(i * this.count, this.points.length - this.count * k - 1));
            this.edges.push(new Edge(this.points.length - i * this.count - 1, this.points.length - k * this.count - 1));
            this.edges.push(new Edge(0, this.points.length - i - 1));
        }
    }

    createPolygon() {
        const polygons = [];
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    j + i * this.count,
                    j + 1 + i * this.count,
                    j + 1 + (i + 1) * this.count,
                    j + (i + 1) * this.count,
                ], this.color));
            }

            this.polygons.push(new Polygon([
                this.points.length - i * this.count - 1,
                this.points.length - (i ? i - 1 : i) * this.count - 1,
                i * this.count,
                (i + 1) * this.count,
            ], this.color));

            this.polygons.push(new Polygon([
                0,
                this.points.length - i - 1,
                this.points.length - i - 2,
            ], this.color))
        }

        this.polygons.push(new Polygon([
            0,
            this.points.length - this.count,
            this.count * 2 - 1,
        ], this.color))
    }
}



















/**Figure.prototype.ellips = (x = 14, y = 10, z = 14, count = 30) => {
    const edges = [];
    const points = [];
    const deltaT = Math.PI / count;
    const deltaF =  2 * Math.PI / count; 

    for(let i = 0; i <= Math.PI; i += deltaT) {
        for(let j = 0; j < 2 * Math.PI; j += deltaF) {
            points.push(new Point(
                x * Math.sin(i) * Math.sin(j),
                y * Math.cos(i),
                z * Math.sin(i) * Math.cos(j)
            ));
        }
    }

    for(let i = 0; i < points.length; i++) {
        if(points[i + 1]) {
            if((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        if(points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }
    edges.push(new Edge(points.length - count, points.length - 1));

	return new FigureBody(points, edges, 'ellips');
}**/