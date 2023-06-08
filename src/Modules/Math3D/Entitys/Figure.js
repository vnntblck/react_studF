import Point from "./point";
export default class Figure {
    constructor({ points = [], edges = [], polygons = [], color = '#ee8844', center = new Point() }) {
        this.center = center;
        this.color = color;
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }

    createFigure() {
        this.points = [];
        this.edges = [];
        this.polygons = [];
        this.createPoints();
        this.createEdges();
        this.createPolygon();

    };

    createPoints() { };
    createEdges() { };
    createPolygon() { };
}