import { Sprite } from "https://esm.sh/pixi.js@6.0.0";


export default class Token {
    constructor(state, config, assets,  x, y, image) {
        const { loader: { resources } } = assets;
        const xy = (i) => i * config.cellsize - config.cellsize;

        this.layer = new Sprite(resources[image].texture);
        this.layer.width = config.cellsize;
        this.layer.interactive = true;
        this.layer.height = config.cellsize;
        this.layer.x = config.cellsize / 2 + xy(x);
        this.layer.y = config.cellsize / 2 + xy(y);
        this.layer.anchor.x = 0.5;
        this.layer.anchor.y = 0.5;
        this.layer.click = () => {
            state.selectedToken = this.layer;
            state.selectedCell.x = this.layer.x / config.cellsize * 2;
            state.selectedCell.y = this.layer.y / config.cellsize * 2;
            state.selectedCell.show();
        };
    }
}