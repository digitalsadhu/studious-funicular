import { Container } from "pixi.js";
import { line } from "./shapes.js";

export default class Grid {
  constructor(config, { thickness }) {
    const { widthPx, heightPx, cellsize } = config;
    this.lines = new Container();
    let x = cellsize;
    while (x < widthPx) {
      this.lines.addChild(
        line({ x, y: 0 }, { x, y: widthPx }, thickness, config.gridTransparency)
      );
      x += cellsize;
    }
    let y = cellsize;
    while (y < heightPx) {
      this.lines.addChild(
        line(
          { x: 0, y },
          { x: heightPx, y },
          thickness,
          config.gridTransparency
        )
      );
      y += cellsize;
    }
  }
}
