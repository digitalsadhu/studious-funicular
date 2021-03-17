import { Sprite, Container, filters } from "pixi.js";

const _settings = Symbol("settings");
const _colorFilter = Symbol("colorFilter");
const _layer = Symbol("layer");

export default class Token {
  constructor(settings, assets, { x, y, src }) {
    const {
      loader: { resources },
    } = assets;
    const xy = (i) => i * settings.cellsize - settings.cellsize;

    this.x = x;
    this.y = y;
    this.src = src;

    this[_settings] = settings;
    this[_layer] = new Container();
    this[_layer].interactive = true;

    this[_colorFilter] = new filters.ColorMatrixFilter();
    this[_layer].filters = [this[_colorFilter]];
    this[_colorFilter].enabled = false;
    this[_colorFilter].hue(45);

    const sprite = new Sprite(resources[src].texture);
    sprite.width = settings.cellsize;
    sprite.height = settings.cellsize;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    this[_layer].x = settings.cellsize / 2 + xy(x);
    this[_layer].y = settings.cellsize / 2 + xy(y);

    this.setupDragAndDrop();

    this[_layer].addChild(sprite);
  }

  setupDragAndDrop() {
    const settings = this[_settings];
    let drag = false;
    this.layer.on("mousedown", () => {
      drag = true;
      this.layer.parent.parent.pause = true;
    });
    this.layer.on("mouseup", (e) => {
      const pos = e.data.getLocalPosition(this.layer.parent);
      // snap
      const closestCellX =
        pos.x - (pos.x % settings.cellsize) + settings.cellsize / 2;
      const closestCellY =
        pos.y - (pos.y % settings.cellsize) + settings.cellsize / 2;
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

  get layer() {
    return this[_layer];
  }

  select() {
    this[_colorFilter].enabled = true;
  }

  unselect() {
    this[_colorFilter].enabled = false;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      src: this.src,
    };
  }
}
