//ily112
import { useEffect } from "react";

import Canvas from "../../Modules/Canvas/canvas";
import Math3D, { Point, Cube, Sphere, Pyramide, Ellips} from "../../Modules/Math3D";

export default function Graph3D() {
    const WIN = {
        LEFT: -5,
        BOTTOM: -5,
        HEIGHT: 10,
        WIDTH: 10,
        DISPLAY: new Point(0, 0, 30),
        CAMERA: new Point(0, 0, 50),
    };
    const height = 500;
    const width = 500;
    const figures = [new Cube({})];
    let canMove = false;

    let dx = 0;
    let dy = 0;

    const math3D = new Math3D({ WIN });

    let canvas = null;

    useEffect(() => {
        canvas = new Canvas({
            id: 'canvas3D',
            width: width,
            height: height,
            WIN: WIN,
            callbacks: {
                wheel,
                mouseUp,
                mouseDown,
                mouseMove,
                mouseLeave,
            },
        });
        renderScene();
    })

    function wheel(event) {
        //event.preventDefault();
        const delta = (event.wheelDeltaY > 0) ? 1.1 : 0.9;
        const matrix = math3D.zoom(delta);
        figures.forEach(figure => {
            figure.points.forEach(point => {
                math3D.transform(matrix, point)
            });
        });
        renderScene();
    };

    function mouseUp() {
        canMove = false;
    };

    function mouseLeave() {
        canMove = false;
    };

    function mouseDown(event) {
        canMove = true;
        dx = event.offsetX
        dy = event.offsetY
    };

    function mouseMove(event) {
        if (canMove) {
            const gradus = Math.PI / 180;
            const matrixY = math3D.rotateOy((dy - event.offsetY) * gradus);
            const matrixX = math3D.rotateOx((dx - event.offsetX) * gradus);
            figures.forEach(figure => {
                figure.points.forEach(point => {
                    math3D.transform(matrixY, point);
                    math3D.transform(matrixX, point);
                });
            });
            dx = event.offsetX;
            dy = event.offsetY;
            renderScene();
        };
    };

    function renderScene() {
        canvas.clear()
        figures.forEach(figure => {
            if (figure) {
                math3D.calcCenters(figure);
                math3D.calcDistance(
                    figure,
                    WIN.CAMERA,
                    'distance',
                );


                figure.polygons.forEach((polygon) => {
                    const points = [];
                    for (let i = 0; i < polygon.points.length; i++) {
                        points.push(figure.points[polygon.points[i]]);
                    };

                    let { r, g, b } = polygon.color;
                    const lumen = 1 //math3D.calcIllumination(polygon.distance, LIGHT.lumen);
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);

                    canvas.polygon(
                        points.map((point) => {
                            return {
                                x: math3D.xs(point),
                                y: math3D.ys(point),
                            };
                        }),
                        polygon.rgbToHex(r, g, b),
                    );
                })

                math3D.sortByArtistAlgorithm(figure.polygons);
            }
        })

        figures.forEach(figure => {
            figure.edges.forEach(edge => {
                const point1 = figure.points[edge.p1];
                const point2 = figure.points[edge.p2];
                canvas.line(
                    math3D.xs(point1),
                    math3D.ys(point1),
                    math3D.xs(point2),
                    math3D.ys(point2),
                    2, 'Black'
                );
            });
        });

        figures.forEach(figure => {
            if (figure) {
                figure.points.forEach(point => {
                    canvas.point(math3D.xs(point), math3D.ys(point), 'black', 4);
                });
            };
        })
    };

    const changeFigureHandler = (name) => {
        switch (name) {
            case 'Cube':
                figures[0] = new Cube({});
                break;
            case 'Sphere':
                figures[0] = new Sphere({});
                console.log(figures)
                break;
            case 'Pyramide':
                figures[0] = new Pyramide({});
                break;
            case 'Ellips':
                figures[0] = new Ellips({});
                console.log(figures)
                break;
            default: break;
        }
        renderScene();
    }

    return (<>
        <canvas id="canvas3D"></canvas>
        <div>
            <button onClick={() => changeFigureHandler('Cube')}>Cube</button>
            <button onClick={() => changeFigureHandler('Sphere')}>Sphere</button>
            <button onClick={() => changeFigureHandler('Pyramide')}>Pyramide</button>
            <button onClick={() => changeFigureHandler('Ellips')}>Ellips</button>

        </div>
    </>
    )
}