import { Loader } from "https://esm.sh/pixi.js@6.0.0";

export default class GameAssets {
    constructor() {
        this.loader = new Loader();
    }

    add(...args) {
        console.log(args);
        this.loader.add(...args);
    }

    load() {
        return new Promise((resolve) => {
            this.loader.load((_, resources) => {
                this.resources = resources;
                resolve();
            })
        });
    }
}