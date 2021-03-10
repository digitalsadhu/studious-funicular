import {
  Loader,
  Application,
  Sprite,
  Graphics,
  Container,
} from "https://esm.sh/pixi.js@6.0.0";

import keyboard from './keyboard.js';

let active;
let selectedCell;

const GRID_SIZE = 50;

const xy = (i) => i * GRID_SIZE - GRID_SIZE;

const token = (x, y, image) => {
  const sprite = new Sprite(loader.resources[image].texture);
  sprite.width = GRID_SIZE;
  sprite.interactive = true;
  sprite.height = GRID_SIZE;
  sprite.x = GRID_SIZE / 2 + xy(x);
  sprite.y = GRID_SIZE / 2 + xy(y);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.click = () => {
      active = sprite;
      selectedCell.x = sprite.x / GRID_SIZE * 2;
      selectedCell.y = sprite.y / GRID_SIZE * 2;
      selectedCell.show();
  };
  return sprite;
}

const background = (image) => {
  const sprite = new Sprite(loader.resources[image].texture);
  sprite.x = 0;
  sprite.y = 0;
  return sprite;
}

const line = (from, to, thickness = 1, alpha = 1) => {
    let line = new Graphics();
    line.lineStyle(thickness, 0xFFFFFF, alpha);
    line.moveTo(from.x, from.y);
    line.lineTo(to.x, to.y);
    return line;
}

const rectangle = (topLeft, bottomRight, thickness = 1, alpha = 1) => {
    let rect = new Graphics();
    rect.lineStyle(thickness, 0xFF3300, alpha);
    rect.beginFill(0x66CCFF);
    rect.drawRect(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
    rect.endFill();
    return rect;
}

class SelectedCell {
    constructor(x, y, cellsize, thickness, alpha) {
        this.rectangle = rectangle(
            { x: x * cellsize - cellsize, y: y * cellsize - cellsize },
            { x: cellsize, y: cellsize },
            thickness,
            alpha,
        );
        this.rectangle.visible = false;
        this.cellsize = cellsize;
    }
    hide () { this.rectangle.visible = false }
    show () { this.rectangle.visible = true }
    set x(val) { this.rectangle.x = val * this.cellsize }
    set y(val) { this.rectangle.y = val * this.cellsize }
}

const grid = ({ width, height, thickness, cellsize, alpha }) => {
    const lines = new Container();
    let x = cellsize;
    while (x < cellsize * width) {
      lines.addChild(line({ x, y: 0 }, { x, y: cellsize * width }, thickness, alpha));
      x += cellsize;
    }
    let y = cellsize;
    while (y < cellsize * height) {
      lines.addChild(line({x: 0, y}, {x: cellsize * height, y}, thickness, alpha));
      y += cellsize;
    }
    return lines;
}

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new Application({
//   width: 500,         // default: 800
//   height: 500,        // default: 600
  antialias: true,    // default: false
  // transparent: false, // default: false
  // resolution: 1       // default: 1
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const loader = new Loader();

loader.add(["public/bg.jpg", "public/nothic.png"]).load(() => {
  app.stage.addChild(background('public/bg.jpg'));
  app.stage.addChild(grid({ width: 30, height: 30, thickness: 1, cellsize: GRID_SIZE, alpha: 0.5 }));

  selectedCell = new SelectedCell(3, 4, 50, 1, 1);
  app.stage.addChild(selectedCell.rectangle);

  const nothic = token(1, 1, "public/nothic.png");
  nothic.vx = 0;
  nothic.vy = 0;
  app.stage.addChild(nothic);
  app.stage.addChild(token(9, 9, "public/nothic.png"));
  app.stage.addChild(token(5, 5, "public/nothic.png"));
  app.stage.addChild(token(3, 4, "public/nothic.png"));
  app.stage.addChild(token(2, 6, "public/nothic.png"));
  app.stage.addChild(token(13, 16, "public/nothic.png"));
  app.stage.addChild(token(17, 2, "public/nothic.png"));
  app.stage.addChild(token(18, 19, "public/nothic.png"));
  app.stage.addChild(token(3, 11, "public/nothic.png"));

  const left = keyboard("ArrowLeft");
  const up = keyboard("ArrowUp");
  const right = keyboard("ArrowRight");
  const down = keyboard("ArrowDown");

  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    active.x -= GRID_SIZE;
  };

  //Up
  up.press = () => {
    active.y -= GRID_SIZE;
  };

  //Right
  right.press = () => {
    active.x += GRID_SIZE;
  };

  //Down
  down.press = () => {
    active.y += GRID_SIZE;
  };

  app.ticker.add(() => {
       // each frame we spin the active around a bit
    //   active.rotation += 0.01;
    //   nothic2.rotation += 0.01;
    //   nothic3.rotation += 0.01;
    // nothic.x += nothic.vx;
    // nothic.y += nothic.vy
  });
});
