export default class Config {
    constructor({ name, width, height, cellsize, backgroundImage, resolution, backgroundColor }) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.cellsize = cellsize;
        this.backgroundImage = backgroundImage;
        this.resolution = resolution;
        this.backgroundColor = backgroundColor;
    }

    get widthPx() {
        return this.width * this.cellsize;
    }

    get heightPx() {
        return this.height * this.cellsize;
    }
}