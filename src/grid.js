import { Container } from "pixi.js";
import { line } from "./shapes.js";

export default class Grid {
  constructor(config) {
    this.config = config;
    this.layer = new Container();
  }

  draw(thickness) {
    const { widthPx, heightPx, cellsize } = this.config;
    let x = cellsize;
    this.layer.removeChildren();
    while (x < widthPx) {
      this.layer.addChild(
        line(
          { x, y: 0 },
          { x, y: widthPx },
          thickness,
          this.config.gridTransparency,
          parseInt(this.config.gridColor, 16)
        )
      );
      x += cellsize;
    }
    let y = cellsize;
    while (y < heightPx) {
      this.layer.addChild(
        line(
          { x: 0, y },
          { x: heightPx, y },
          thickness,
          this.config.gridTransparency,
          parseInt(this.config.gridColor, 16)
        )
      );
      y += cellsize;
    }
  }
}
