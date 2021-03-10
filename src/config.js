export default class Config {
    constructor({ width, height, cellsize, background, resolution }) {
        this.width = width;
        this.height = height;
        this.cellsize = cellsize;
        this.background = background;
        this.resolution = resolution;
    }

    get widthPx() {
        return this.width * this.cellsize;
    }

    get heightPx() {
        return this.height * this.cellsize;
    }
}