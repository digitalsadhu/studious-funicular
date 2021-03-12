import { Sprite } from "pixi.js";

export default class Background {
  constructor(assets) {
    this.assets = assets;
  }

  set(image) {
    this.image = image;
    this.layer = new Sprite(this.assets.resources[image].texture);
    this.layer.x = 0;
    this.layer.y = 0;
  }
}
