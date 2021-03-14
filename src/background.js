import { Sprite, Container } from "pixi.js";

export default class Background {
  constructor(assets) {
    this.assets = assets;
    this.layer = new Container();
  }

  set(src) {
    this.src = src;
    this.layer.removeChild(this.sprite);
    this.sprite = new Sprite(this.assets.resources[src].texture);
    this.layer.addChild(this.sprite);
    this.layer.x = 0;
    this.layer.y = 0;
  }
}
