import { Container } from "pixi.js";
import { line } from "./shapes.js";

export default class Grid {
  constructor() {
    this.layer = new Container();
  }

  draw(settings) {
    console.log(settings);
    const { cellsize, gridTransparency, gridColor } = settings;
    const thickness = 1;
    let x = cellsize;
    this.layer.removeChildren();
    while (x < settings.widthPx) {
      this.layer.addChild(
        line(
          { x, y: 0 },
          { x, y: settings.widthPx },
          thickness,
          gridTransparency,
          parseInt(gridColor, 16)
        )
      );
      x += cellsize;
    }
    let y = cellsize;
    while (y < settings.heightPx) {
      this.layer.addChild(
        line(
          { x: 0, y },
          { x: settings.heightPx, y },
          thickness,
          gridTransparency,
          parseInt(gridColor, 16)
        )
      );
      y += cellsize;
    }
  }
}
