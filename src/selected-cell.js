import { rectangle } from './shapes.js';

export default class SelectedCell {
    constructor(x, y, cellsize, thickness, alpha) {
        this.rectangle = rectangle(
            { x: x * cellsize - cellsize, y: y * cellsize - cellsize },
            { x: cellsize, y: cellsize },
            thickness,
            alpha,
        );
        this.rectangle.visible = false;
        this.cellsize = cellsize;
    }
    hide () { this.rectangle.visible = false }
    show () { this.rectangle.visible = true }
    set x(val) { this.rectangle.x = val * this.cellsize }
    set y(val) { this.rectangle.y = val * this.cellsize }
};