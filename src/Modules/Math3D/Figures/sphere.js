import { Figure, Point, Polygon, Edge } from "../Entitys";
export default class Sphere extends Figure {
	constructor ({
		color = '#44ddee',
		center,
		r = 10,
		crcs = 25,
	}) {
		super ({color, center, r, crcs});

		this.r = r;
		this.crcs = crcs;
		this.createFigure();

	}

	createPoints() {
		const points = [];
		const deltaT = Math.PI / this.crcs;
		const deltaF = 2 * Math.PI / this.crcs;
	
		for (let i = 0; i <= Math.PI; i += deltaT) {
			for (let j = 0; j < 2 * Math.PI; j += deltaF) {
				points.push(new Point(
					(this.r * Math.sin(i) * Math.sin(j) + this.center.x),
					(this.r * Math.cos(i) + this.center.y),
					(this.r * Math.sin(i) * Math.cos(j) + this.center.z)
				));
			}
		}
		this.points = points;
	}

	createEdges() {
		const edges = [];

		for (let i = 0; i < this.points.length; i++) {
			if (this.points[i + 1]) {
				if ((i + 1) % this.crcs === 0) {
					edges.push(new Edge(i, i + 1 - this.crcs));
				} else {
					edges.push(new Edge(i, i + 1));
				}
			}
			if (this.points[i + this.crcs]) {
				edges.push(new Edge(i, i + this.crcs));
			}
		}

		this.edges = edges;
	}

	createPolygon() {
		const polygons = [];

		for (let i = 0; i < this.crcs - 1; i++) {
            for (let j = 0; j < this.crcs - 1; j++) {
                this.polygons.push(new Polygon([
                    j + i * this.crcs,
                    j + 1 + i * this.crcs,
                    j + 1 + (i + 1) * this.crcs,
                    j + (i + 1) * this.crcs,
                ], this.color));
            }

            this.polygons.push(new Polygon([
                this.points.length - i * this.crcs - 1,
                this.points.length - (i ? i - 1 : i) * this.crcs - 1,
                i * this.crcs,
                (i + 1) * this.crcs,
            ], this.color));

            this.polygons.push(new Polygon([
                0,
                this.points.length - i - 1,
                this.points.length - i - 2,
            ], this.color))
        }

        this.polygons.push(new Polygon([
            0,
            this.points.length - this.crcs,
            this.crcs * 2 - 1,
        ], this.color))
    
	}
}






















