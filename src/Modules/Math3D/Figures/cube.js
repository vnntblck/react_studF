import {Figure, Point, Polygon, Edge} from "../Entitys";
export default class Cube extends Figure {
    constructor({
        color = '#44ddee',
        size = 10,
        center }) {
        super({ color, center });
        this.size = size / 2;
    

        this.createFigure();
    };

    createPoints() {
        this.points = [
            new Point(this.size + this.center.x, this.size + this.center.y, this.size + this.center.z),
            new Point(-this.size + this.center.x, this.size + this.center.y, this.size + this.center.z),
            new Point(this.size + this.center.x, -this.size + this.center.y, this.size + this.center.z),
            new Point(-this.size + this.center.x, -this.size + this.center.y, this.size + this.center.z),
            new Point(this.size + this.center.x, this.size + this.center.y, -this.size + this.center.z),
            new Point(this.size + this.center.x, -this.size + this.center.y, -this.size + this.center.z),
            new Point(-this.size + this.center.x, this.size + this.center.y, -this.size + this.center.z),
            new Point(-this.size + this.center.x, -this.size + this.center.y, -this.size + this.center.z),
        ];
    }

    createEdges() {
        this.edges = [
            new Edge(0, 4),
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(6, 1),
            new Edge(6, 4),
            new Edge(6, 7),
            new Edge(5, 7),
            new Edge(5, 4),
            new Edge(5, 2),
            new Edge(3, 7),
            new Edge(3, 2),
            new Edge(3, 1),
        ];
    }

    createPolygon() {
        this.polygons = [
            new Polygon([0, 1, 3, 2], this.color),
            new Polygon([0, 1, 6, 4], this.color),
            new Polygon([0, 2, 5, 4], this.color),
            new Polygon([2, 3, 7, 5], this.color),
            new Polygon([3, 1, 6, 7], this.color),
            new Polygon([4, 5, 7, 6], this.color),
        ]
    }


}

























