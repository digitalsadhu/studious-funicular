import { Application as App } from "pixi.js";
import { Viewport } from "pixi-viewport";
import keyboard from "./keyboard.js";
import Grid from "./grid.js";
import Background from "./background.js";
import Token from "./token.js";
import TokenCollection from "./token-collection.js";
import GameAssets from "./game-assets.js";
import GameState from "./game-state.js";

const render = Symbol("render");

export default class TableTop {
  constructor({ config, assets }) {
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

    this.viewport.drag().pinch().wheel().decelerate();

    this.config = config;

    this.state = new GameState();

    this.assetLoader = new GameAssets();
    this.assetLoader.add(assets.tokens);

    this.background = new Background(this.assetLoader);

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
      // each frame we spin the active around a bit
      //   active.rotation += 0.01;
      //   nothic2.rotation += 0.01;
      //   nothic3.rotation += 0.01;
      // nothic.x += nothic.vx;
      // nothic.y += nothic.vy
    });

    const tokens = new TokenCollection(this.state);
    this.tokens = tokens;

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
    this.tokens.add(t);
  }

  async [render]() {
    const { config } = this;
    this.app.renderer.backgroundColor = parseInt(config.backgroundColor, 16);

    await this.setBackgroundImage(config.backgroundImage);

    if (this.grid) {
      this.viewport.removeChild(this.grid.lines);
    }
    this.grid = new Grid(config, { thickness: 1 });
    this.viewport.addChild(this.grid.lines);
  }

  async setBackgroundImage(image) {
    if (image !== this.background.image) {
      this.viewport.removeChild(this.background.layer);
    }
    if (image) {
      if (!this.assetLoader.has(image)) {
        this.assetLoader.add(this.config.backgroundImage);
        await this.assetLoader.load();
      }
      this.background.set(image);
      this.viewport.addChild(this.background.layer);
    }
  }

  async run() {
    const { config } = this;
    await this.assetLoader.load();
    this.app.renderer.backgroundColor = parseInt(config.backgroundColor, 16);
    config.events.on("config:update", async () => {
      await this[render]();
    });
    await this[render]();
    this.viewport.addChild(this.tokens.layer);
  }
}
