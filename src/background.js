import { Sprite } from "pixi.js";

export default class Background {
    constructor(assets) {
        console.log(assets.resources)
        this.layer = new Sprite(assets.resources.backgroundImage.texture);
        this.layer.x = 0;
        this.layer.y = 0;
    }
}