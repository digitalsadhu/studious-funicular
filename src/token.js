import { Sprite, Container, filters } from "pixi.js";

export default class Token {
  constructor(config, assets, { x, y, image }) {
    const {
      loader: { resources },
    } = assets;
    const xy = (i) => i * config.cellsize - config.cellsize;

    this.config = config;
    const layer = new Container();
    this.layer = layer;
    layer.interactive = true;

    this.colorFilter = new filters.ColorMatrixFilter();
    layer.filters = [this.colorFilter];
    this.colorFilter.enabled = false;
    this.colorFilter.hue(180);

    const sprite = new Sprite(resources[image].texture);
    sprite.width = config.cellsize;
    sprite.height = config.cellsize;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    
    layer.x = config.cellsize / 2 + xy(x);
    layer.y = config.cellsize / 2 + xy(y);
    
    this.setupDragAndDrop();

    layer.addChild(sprite);
  }

  setupDragAndDrop() {
    const config = this.config;
    let drag = false;
    this.layer.on("mousedown", () => {
      drag = true;
      this.layer.parent.parent.pause = true;
    });
    this.layer.on("mouseup", (e) => {
      const pos = e.data.getLocalPosition(this.layer.parent);
      // snap
      const closestCellX = pos.x - (pos.x % this.config.cellsize) + (config.cellsize / 2);
      const closestCellY = pos.y - (pos.y % this.config.cellsize) + (config.cellsize / 2);
      this.layer.position.x = closestCellX;
      this.layer.position.y = closestCellY;
      drag = false;
      this.layer.parent.parent.pause = false;
    });
    this.layer.on("mousemove", (e) => {
      if (drag) {
        this.layer.position.x = e.data.getLocalPosition(this.layer.parent).x;
        this.layer.position.y = e.data.getLocalPosition(this.layer.parent).y;
      }
    });
  }

  select() {
    this.colorFilter.enabled = true;
  }

  unselect() {
    this.colorFilter.enabled = false;
  }
}
