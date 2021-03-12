import { Application as App } from "pixi.js";
import { Viewport } from "pixi-viewport";
import keyboard from "./keyboard.js";
import Grid from "./grid.js";
import Background from "./background.js";
import Token from "./token.js";
import TokenCollection from "./token-collection.js";

export default class Application {
  constructor({ config, state, assets }) {
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

    this.app.renderer.backgroundColor = config.backgroundColor;

    this.viewport.drag().pinch().wheel().decelerate();

    this.config = config;
    this.state = state;
    this.assets = assets;
  }

  createTokenAtCoords(token) {
    const { x, y } = this.viewport.toWorld(token.x, token.y);
    const cellX = Math.ceil(x / this.config.cellsize);
    const cellY = Math.ceil(y / this.config.cellsize);
    const t = new Token(this.config, this.assets, {
      x: cellX,
      y: cellY,
      image: token.src,
    });
    this.tokens.add(t);
  }

  async run() {
    const { app, config, assets, state } = this;

    document.body.appendChild(app.view);

    assets.add("backgroundImage", config.backgroundImage);
    assets.add(["public/nothic.png"]);
    await assets.load();

    const background = new Background(assets);
    this.viewport.addChild(background.layer);

    const grid = new Grid(config, { thickness: 1 });
    this.viewport.addChild(grid.lines);

    const tokens = new TokenCollection(state);
    this.tokens = tokens;

    const nothic = new Token(config, assets, {
      x: 1,
      y: 1,
      image: "public/nothic.png",
    });
    tokens.add(nothic);

    const nothic2 = new Token(config, assets, {
      x: 9,
      y: 9,
      image: "public/nothic.png",
    });
    tokens.add(nothic2);

    this.viewport.addChild(tokens.layer);

    const left = keyboard("ArrowLeft");
    const up = keyboard("ArrowUp");
    const right = keyboard("ArrowRight");
    const down = keyboard("ArrowDown");

    //Left arrow key `press` method
    left.press = () => {
      if (!state.selectedToken) return;
      //Change the cat's velocity when the key is pressed
      state.selectedToken.layer.x -= config.cellsize;
    };

    //Up
    up.press = () => {
      if (!state.selectedToken) return;
      state.selectedToken.layer.y -= config.cellsize;
    };

    //Right
    right.press = () => {
      if (!state.selectedToken) return;
      state.selectedToken.layer.x += config.cellsize;
    };

    //Down
    down.press = () => {
      if (!state.selectedToken) return;
      state.selectedToken.layer.y += config.cellsize;
    };

    app.ticker.add(() => {
      // each frame we spin the active around a bit
      //   active.rotation += 0.01;
      //   nothic2.rotation += 0.01;
      //   nothic3.rotation += 0.01;
      // nothic.x += nothic.vx;
      // nothic.y += nothic.vy
    });
  }
}
