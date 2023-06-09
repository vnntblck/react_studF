import Point from './point';

export default class Light extends Point {
    constructor(x, y, z, lumen = 100000) {
        super(x, y, z)
        this.lumen = lumen;
    }
}