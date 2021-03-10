import { Application as App } from "https://esm.sh/pixi.js@6.0.0";
import keyboard from "./keyboard.js";
import SelectedCell from "./selected-cell.js";
import Grid from "./grid.js";
import Background from "./background.js";
import Token from "./token.js";

export default class Application {
    constructor({ config, state, assets }) {
        this.app = new App({
              width: 100,         // default: 800
              height: 100,        // default: 600
            antialias: true,
            resolution: config.resolution,
            resizeTo: window,
            // powerPreference: 'high-performance',
        });
        this.config = config;
        this.state = state;
        this.assets = assets;
    }

    async run() {
        const { app, config, assets, state } = this;

        // app.renderer.view.style.position = "absolute";
        // app.renderer.view.style.display = "block";
        // app.renderer.autoResize = true;
        // app.renderer.resize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(app.view);

        assets.add('background', config.background);
        assets.add(["public/media/nothic.png"]);
        await assets.load();
        
        const background = new Background(assets);
        app.stage.addChild(background.layer);

        const grid = new Grid(config, { thickness: 1, alpha: 0.5 });
        app.stage.addChild(grid.lines);

        state.selectedCell = new SelectedCell(3, 4, 50, 1, 1);
        app.stage.addChild(state.selectedCell.rectangle);

        const nothic = new Token(
            state,
            config,
            assets,
            1,
            1,
            "public/media/nothic.png"
        );
        nothic.vx = 0;
        nothic.vy = 0;
        app.stage.addChild(nothic.layer);

        // app.stage.addChild(token(9, 9, "public/media/nothic.png"));
        // app.stage.addChild(token(5, 5, "public/media/nothic.png"));
        // app.stage.addChild(token(3, 4, "public/media/nothic.png"));
        // app.stage.addChild(token(2, 6, "public/media/nothic.png"));
        // app.stage.addChild(token(13, 16, "public/media/nothic.png"));
        // app.stage.addChild(token(17, 2, "public/media/nothic.png"));
        // app.stage.addChild(token(18, 19, "public/media/nothic.png"));
        // app.stage.addChild(token(3, 11, "public/media/nothic.png"));

        const left = keyboard("ArrowLeft");
        const up = keyboard("ArrowUp");
        const right = keyboard("ArrowRight");
        const down = keyboard("ArrowDown");

        //Left arrow key `press` method
        left.press = () => {
            if (!state.selectedToken) return;
            //Change the cat's velocity when the key is pressed
            state.selectedToken.x -= config.cellsize;
        };

        //Up
        up.press = () => {
            if (!state.selectedToken) return;
            state.selectedToken.y -= config.cellsize;
        };

        //Right
        right.press = () => {
            if (!state.selectedToken) return;
            state.selectedToken.x += config.cellsize;
        };

        //Down
        down.press = () => {
            if (!state.selectedToken) return;
            state.selectedToken.y += config.cellsize;
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