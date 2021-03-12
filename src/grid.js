import { Container } from "pixi.js";
import { line } from "./shapes.js";

export default class Grid {
  constructor(config, { thickness }) {
    const { width, height, cellsize } = config;
    this.lines = new Container();
    let x = cellsize;
    while (x < cellsize * width) {
      this.lines.addChild(
        line(
          { x, y: 0 },
          { x, y: cellsize * width },
          thickness,
          config.gridTransparency
        )
      );
      x += cellsize;
    }
    let y = cellsize;
    while (y < cellsize * height) {
      this.lines.addChild(
        line(
          { x: 0, y },
          { x: cellsize * height, y },
          thickness,
          config.gridTransparency
        )
      );
      y += cellsize;
    }
  }
}
