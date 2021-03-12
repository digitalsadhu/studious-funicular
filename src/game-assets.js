import { Loader } from "pixi.js";

export default class GameAssets {
  constructor() {
    this.loader = new Loader();
  }

  add(...args) {
    this.loader.add(...args);
  }

  has(name) {
    return !!this.loader.resources[name];
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
