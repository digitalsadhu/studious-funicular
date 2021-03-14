import { Application as App } from "pixi.js";
import { Viewport } from "pixi-viewport";
// import keyboard from "./keyboard.js";
import Grid from "./grid.js";
import Background from "./background.js";
import Token from "./token.js";
import TokenCollection from "./token-collection.js";
import GameAssets from "./game-assets.js";

export default class TableTop {
  constructor({ assets, state }) {
    this.app = new App({
      // width: 100,         // default: 800
      // height: 100,        // default: 600
      antialias: true,
      resolution: state.settings.resolution,
      resizeTo: window,
      // powerPreference: 'high-performance',
    });
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      // worldWidth: 1000,
      // worldHeight: 1000,

      interaction: this.app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    this.app.stage.addChild(this.viewport);
    this.assetLoader = new GameAssets();
    this.assetLoader.add(assets.tokens);
    this.assetLoader.add(assets.backgrounds);

    this.selectedToken = null;

    this.layers = {
      background: new Background(this.assetLoader),
      grid: new Grid(),
      tokens: new TokenCollection(this),
    };

    this.viewport.addChild(this.layers.background.layer);
    this.viewport.addChild(this.layers.grid.layer);
    this.viewport.addChild(this.layers.tokens.layer);

    this.state = state;

    this.viewport.drag().pinch().wheel().decelerate();

    // const left = keyboard("ArrowLeft");
    // const up = keyboard("ArrowUp");
    // const right = keyboard("ArrowRight");
    // const down = keyboard("ArrowDown");

    // //Left arrow key `press` method
    // left.press = () => {
    //   if (!this.selectedToken) return;
    //   //Change the cat's velocity when the key is pressed
    //   this.selectedToken.layer.x -= state.settings.cellsize;
    // };

    // //Up
    // up.press = () => {
    //   if (!this.selectedToken) return;
    //   this.selectedToken.layer.y -= state.settings.cellsize;
    // };

    // //Right
    // right.press = () => {
    //   if (!this.selectedToken) return;
    //   this.selectedToken.layer.x += state.settings.cellsize;
    // };

    // //Down
    // down.press = () => {
    //   if (!this.selectedToken) return;
    //   this.selectedToken.layer.y += state.settings.cellsize;
    // };

    // this.app.ticker.add(() => {
    //   // animation stuff
    // });

    document.getElementById("canvas").appendChild(this.app.view);
  }

  createTokenAtCoords(tokenData) {
    const { x, y } = this.viewport.toWorld(
      tokenData.x / this.state.settings.resolution,
      tokenData.y / this.state.settings.resolution
    );
    const cellX = Math.ceil(x / this.state.settings.cellsize);
    const cellY = Math.ceil(y / this.state.settings.cellsize);
    this.state.tokens.add({
      x: cellX,
      y: cellY,
      src: tokenData.src,
    });
  }

  setGridlines(settings) {
    this.layers.grid.draw(settings);
  }

  setResolution(resolution) {
    this.app.renderer.resolution = resolution;
  }

  setBackgroundColor(color) {
    this.app.renderer.backgroundColor = parseInt(color, 16);
  }

  async setBackgroundImage(image) {
    this.layers.background.set(image);
  }

  async run() {
    await this.assetLoader.load();

    this.state.on("state:background:update", (background) => {
      this.setBackgroundImage(background.src);
    });

    this.state.on("state:settings:update", (settings) => {
      this.setBackgroundColor(settings.backgroundColor);
      this.setResolution(settings.resolution);
      this.setGridlines(settings);
    });

    this.state.on("state:tokens:add", (token) => {
      this.layers.tokens.add(
        new Token(this.state.settings, this.assetLoader, token)
      );
    });

    this.viewport.addChild(this.layers.tokens.layer);
  }
}
