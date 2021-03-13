import EventEmitter from "eventemitter3";

const events = Symbol("events");
const populate = Symbol("populate");

export default class Config {
  constructor({
    name,
    width,
    height,
    cellsize,
    backgroundImage,
    resolution,
    backgroundColor,
    gridTransparency,
    gridColor,
  } = {}) {
    this.name = name || "";
    this.width = width || 10;
    this.height = height || 10;
    this.cellsize = cellsize || 50;
    this.backgroundImage = backgroundImage || null;
    this.resolution = resolution || 1;
    this.backgroundColor = backgroundColor || "8f8f8f";
    this.gridTransparency = gridTransparency || 1;
    this.gridColor = gridColor || "ffffff";
    this[events] = new EventEmitter();
  }

  get widthPx() {
    return this.width * this.cellsize;
  }

  get heightPx() {
    return this.height * this.cellsize;
  }

  get events() {
    return this[events];
  }

  async save(settings) {
    const store = window.localStorage;
    store.setItem("atlas:config", JSON.stringify(settings));
    this[populate](settings);
    this[events].emit("config:update");
  }

  [populate](settings) {
    if (!settings) return;
    const {
      name,
      width,
      height,
      cellsize,
      backgroundImage,
      resolution,
      backgroundColor,
      gridTransparency,
      gridColor,
    } = settings;
    this.name = name;
    this.width = parseInt(width, 10);
    this.height = parseInt(height, 10);
    this.cellsize = parseInt(cellsize, 10);
    this.backgroundImage = backgroundImage;
    this.resolution = parseInt(resolution, 10);
    this.backgroundColor = backgroundColor;
    this.gridTransparency = parseFloat(gridTransparency, 10);
    this.gridColor = gridColor;
  }

  async load() {
    const store = window.localStorage;
    const settings = store.getItem("atlas:config");
    this[populate](JSON.parse(settings));
  }
}
