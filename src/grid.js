import { Container } from "https://esm.sh/pixi.js@6.0.0";
import { line } from './shapes.js';

export default class Grid {
    constructor(config, { thickness, alpha }) {
        const { width, height, cellsize } = config;
        this.lines = new Container();
        let x = cellsize;
        while (x < cellsize * width) {
          this.lines.addChild(line({ x, y: 0 }, { x, y: cellsize * width }, thickness, alpha));
          x += cellsize;
        }
        let y = cellsize;
        while (y < cellsize * height) {
          this.lines.addChild(line({x: 0, y}, {x: cellsize * height, y}, thickness, alpha));
          y += cellsize;
        }
    }
}