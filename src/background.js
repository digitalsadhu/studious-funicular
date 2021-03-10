import { Sprite } from "https://esm.sh/pixi.js@6.0.0";

export default class Background {
    constructor(assets) {
        console.log(assets.resources)
        this.layer = new Sprite(assets.resources.background.texture);
        this.layer.x = 0;
        this.layer.y = 0;
    }
}