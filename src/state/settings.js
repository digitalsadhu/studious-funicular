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
    return parseInt(this.width * this.cellsize, 10);
  }

  get heightPx() {
    return parseInt(this.height * this.cellsize, 10);
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
    let changes = false;

    if (name && name !== this.name) {
      this.name = name;
      changes = true;
    }

    if (width && width !== this.width) {
      this.width = parseInt(width, 10);
      changes = true;
    }

    if (height && height !== this.height) {
      this.height = parseInt(height, 10);
      changes = true;
    }

    if (cellsize && cellsize !== this.cellsize) {
      this.cellsize = parseInt(cellsize, 10);
      changes = true;
    }

    if (resolution && resolution !== this.resolution) {
      this.resolution = parseInt(resolution, 10);
      changes = true;
    }

    if (backgroundColor && backgroundColor !== this.backgroundColor) {
      this.backgroundColor = backgroundColor;
      changes = true;
    }

    if (gridTransparency && gridTransparency !== this.gridTransparency) {
      this.gridTransparency = parseFloat(gridTransparency);
      changes = true;
    }

    if (gridColor && gridColor !== this.gridColor) {
      this.gridColor = gridColor;
      changes = true;
    }

    return changes;
  }
}
