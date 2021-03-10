import { Graphics } from "https://esm.sh/pixi.js@6.0.0";

export const line = (from, to, thickness = 1, alpha = 1) => {
    let line = new Graphics();
    line.lineStyle(thickness, 0xFFFFFF, alpha);
    line.moveTo(from.x, from.y);
    line.lineTo(to.x, to.y);
    return line;
}

export const rectangle = (topLeft, bottomRight, thickness = 1, alpha = 1) => {
    let rect = new Graphics();
    rect.lineStyle(thickness, 0xFF3300, alpha);
    rect.beginFill(0x66CCFF);
    rect.drawRect(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
    rect.endFill();
    return rect;
}