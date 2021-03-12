import { Graphics } from "pixi.js";

export const line = (from, to, thickness = 1, alpha = 1) => {
  let line = new Graphics();
  line.lineStyle(thickness, 0xffffff, alpha);
  line.moveTo(from.x, from.y);
  line.lineTo(to.x, to.y);
  return line;
};

export const rectangle = (topLeft, bottomRight, thickness = 1, alpha = 1) => {
  let rect = new Graphics();
  rect.lineStyle(thickness, 0xff3300, alpha);
  rect.beginFill(0x66ccff);
  rect.drawRect(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
  rect.endFill();
  return rect;
};
