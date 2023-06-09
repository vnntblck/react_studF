export default class Math3D {
	constructor({ WIN }) {
		this.WIN = WIN;
	}

	xs(point) {
		return point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
	}

	ys(point) {
		return point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
	}

	multMatrix(T = [], m = []) {
		const matrString = [0, 0, 0, 0]
		for (let j = 0; j < T.length; j++) {
			for (let i = 0; i < T[j].length; i++) {
				matrString[j] += T[j][i] * m[i];
			}
		}
		return matrString;
	}

	calcCenters(figure) {
		figure.polygons.forEach(polygon => {
			const points = polygon.points;
			let x = 0, y = 0, z = 0;
			for (let j = 0; j < points.length; j++) {
				x += figure.points[points[j]].x;
				y += figure.points[points[j]].y;
				z += figure.points[points[j]].z;
			}
			polygon.center.x = x / points.length;
			polygon.center.y = y / points.length;
			polygon.center.z = z / points.length;
		});
	}

	calcDistance(figure, endPoint, name) {
		figure.polygons.forEach(polygon => {
			polygon[name] = Math.sqrt(
				Math.pow(endPoint.x - polygon.center.x, 2) +
				Math.pow(endPoint.y - polygon.center.y, 2) +
				Math.pow(endPoint.z - polygon.center.z, 2)
			)
		});
	}

	sortByArtistAlgorithm(polygons) {
		polygons.sort((a, b) => b.distance - a.distance);
	}

	transform(matrix, point) {
		const array = this.multMatrix(
			matrix,
			[point.x, point.y, point.z, 1]
		);
		point.x = array[0];
		point.y = array[1];
		point.z = array[2];
	}

	zoom(delta) {
		return [
			[delta, 0, 0, 0],
			[0, delta, 0, 0],
			[0, 0, delta, 0],
			[0, 0, 0, 1]
		];
	}

	move(dx, dy, dz) {
		return [
			[1, 0, 0, dx],
			[0, 1, 0, dy],
			[0, 0, 1, dz],
			[0, 0, 0, 1]
		];
	}

	rotateOy(alpha) {
		return [
			[1, 0, 0, 0],
			[0, Math.cos(alpha), Math.sin(alpha), 0],
			[0, -(Math.sin(alpha)), Math.cos(alpha), 0],
			[0, 0, 0, 1]
		];
	}

	rotateOx(alpha) {
		return [
			[Math.cos(alpha), 0, -(Math.sin(alpha)), 0],
			[0, 1, 0, 0],
			[Math.sin(alpha), 0, Math.cos(alpha), 0],
			[0, 0, 0, 1]
		];
	}

	rotateOz(alpha) {
		return [
			[Math.cos(alpha), Math.sin(alpha), 0, 0],
			[-(Math.sin(alpha)), Math.cos(alpha), 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		];
	}

	calcShadow(polygon, figures, LIGHT) {
        if (polygon.radius) {
            const m1 = polygon.centre;
            const radius = polygon.radius;
            const s = this.calcVector(m1, LIGHT);
            for (let i = 0; i < figures.length; i++) {
                if (polygon.figureIndex === i) {
                    continue;
                }

                if (figures[i]) {
                    for (let j = 0; j < figures[i].polygons.length; j++) {
                        const polygon2 = figures[i].polygons[j];
                        const m0 = polygon2.centre;
                        if (polygon.lumen < polygon2.lumen) {
                            continue;
                        }
                        const dark = this.calcVectorModule(
                            this.vectProd(this.calcVector(m0, m1),
                                s
                            )) / this.calcVectorModule(s);
                        if (dark < radius) {
                            return {
                                isShadow: true,
                                dark: dark / 1.3
                            }
                        }
                    }
                }
            }
        }
        return {
            isShadow: false,
        }
    }

	calcIllumination(distance, lumen) {
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return res > 1 ? 1 : res;
    }
}