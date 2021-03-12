import { Loader } from "pixi.js";

export default class GameAssets {
  constructor() {
    this.loader = new Loader();
  }

  add(...args) {
    this.loader.add(...args);
  }

  load() {
    return new Promise((resolve) => {
      this.loader.load((_, resources) => {
        this.resources = resources;
        resolve();
      });
    });
  }
}
