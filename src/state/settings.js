export default class Settings {
  constructor() {
    this.name = "";
    this.width = 10;
    this.height = 10;
    this.cellsize = 50;
    this.resolution = 1;
    this.backgroundColor = "8f8f8f";
    this.gridTransparency = 1;
    this.gridColor = "ffffff";
  }

  get widthPx() {
    return this.width * this.cellsize;
  }

  get heightPx() {
    return this.height * this.cellsize;
  }

  set({
    name,
    width,
    height,
    cellsize,
    resolution,
    backgroundColor,
    gridTransparency,
    gridColor,
  } = {}) {
    const changes = false;

    if (name && name !== this.name) {
      this.name = name;
      changes = true;
    }

    if (width && width !== this.width) {
      this.width = width;
      changes = true;
    }

    if (height && height !== this.height) {
      this.height = height;
      changes = true;
    }

    if (cellsize && cellsize !== this.cellsize) {
      this.cellsize = cellsize;
      changes = true;
    }

    if (resolution && resolution !== this.resolution) {
      this.resolution = resolution;
      changes = true;
    }

    if (backgroundColor && backgroundColor !== this.backgroundColor) {
      this.backgroundColor = backgroundColor;
      changes = true;
    }

    if (gridTransparency && gridTransparency !== this.gridTransparency) {
      this.gridTransparency = gridTransparency;
      changes = true;
    }

    if (gridColor && gridColor !== this.gridColor) {
      this.gridColor = gridColor;
      changes = true;
    }

    return changes;
  }
}
