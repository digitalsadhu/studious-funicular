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
  } = {}) {
    this.name = name || "";
    this.width = width || 10;
    this.height = height || 10;
    this.cellsize = cellsize || 50;
    this.backgroundImage = backgroundImage || null;
    this.resolution = resolution || 1;
    this.backgroundColor = backgroundColor || 0x8f8f8f;
    this.gridTransparency = gridTransparency || 1;
  }

  get widthPx() {
    return this.width * this.cellsize;
  }

  get heightPx() {
    return this.height * this.cellsize;
  }

  save(settings) {
    const store = window.localStorage;
    store.setItem("atlas:config", JSON.stringify(settings));
  }

  load() {
    const store = window.localStorage;
    const settings = store.getItem("atlas:config");
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
    } = JSON.parse(settings);
    this.name = name;
    this.width = parseInt(width, 10);
    this.height = parseInt(height, 10);
    this.cellsize = parseInt(cellsize, 10);
    this.backgroundImage = backgroundImage;
    this.resolution = parseInt(resolution, 10);
    this.backgroundColor = backgroundColor;
    this.gridTransparency = parseInt(gridTransparency, 10);
  }
}
