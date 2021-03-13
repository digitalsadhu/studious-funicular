import { Application as App, Container } from "pixi.js";
import { Viewport } from "pixi-viewport";
import keyboard from "./keyboard.js";
import Grid from "./grid.js";
import Background from "./background.js";
import Token from "./token.js";
import TokenCollection from "./token-collection.js";
import GameAssets from "./game-assets.js";

const renderConfigValues = Symbol("renderConfigValues");
const renderStateValues = Symbol("renderStateValues");

export default class TableTop {
  constructor({ config, assets, state }) {
    this.app = new App({
      // width: 100,         // default: 800
      // height: 100,        // default: 600
      antialias: true,
      resolution: config.resolution,
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

    this.layers = {
      background: new Background(this.assetLoader),
      grid: new Grid(config),
      tokens: new TokenCollection(state),
    };

    this.viewport.addChild(this.layers.background.layer);
    this.viewport.addChild(this.layers.grid.layer);
    this.viewport.addChild(this.layers.tokens.layer);

    this.state = state;

    this.viewport.drag().pinch().wheel().decelerate();

    this.config = config;

    const left = keyboard("ArrowLeft");
    const up = keyboard("ArrowUp");
    const right = keyboard("ArrowRight");
    const down = keyboard("ArrowDown");

    //Left arrow key `press` method
    left.press = () => {
      if (!this.state.selectedToken) return;
      //Change the cat's velocity when the key is pressed
      this.state.selectedToken.layer.x -= config.cellsize;
    };

    //Up
    up.press = () => {
      if (!this.state.selectedToken) return;
      this.state.selectedToken.layer.y -= config.cellsize;
    };

    //Right
    right.press = () => {
      if (!this.state.selectedToken) return;
      this.state.selectedToken.layer.x += config.cellsize;
    };

    //Down
    down.press = () => {
      if (!this.state.selectedToken) return;
      this.state.selectedToken.layer.y += config.cellsize;
    };

    this.app.ticker.add(() => {
      // animation stuff
    });

    document.getElementById("canvas").appendChild(this.app.view);
  }

  createTokenAtCoords(token) {
    const { x, y } = this.viewport.toWorld(
      token.x / this.config.resolution,
      token.y / this.config.resolution
    );
    const cellX = Math.ceil(x / this.config.cellsize);
    const cellY = Math.ceil(y / this.config.cellsize);
    const t = new Token(this.config, this.assetLoader, {
      x: cellX,
      y: cellY,
      image: token.src,
    });
    this.layers.tokens.add(t);
  }

  async [renderConfigValues]() {
    const { config } = this;

    this.setBackgroundColor(config.backgroundColor);
    await this.setBackgroundImage(config.backgroundImage);
    this.setGridlines(1);
    this.setResolution(config.resolution);
  }

  async [renderStateValues]() {
    const { state } = this;
    console.log("state change");
    this.layers.tokens.removeAll();
    for (const token of state.tokens) {
      this.createTokenAtCoords(token);
    }
  }

  setGridlines(thickness) {
    this.layers.grid.draw(thickness);
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

    this.config.events.on("config:update", async () => {
      await this[renderConfigValues]();
    });

    this.state.events.on("state:update", async () => {
      await this[renderStateValues]();
    });

    await this[renderConfigValues]();
    await this[renderStateValues]();

    this.viewport.addChild(this.layers.tokens.layer);
  }
}
