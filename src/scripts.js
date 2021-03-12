import GameState from "./game-state.js";
import TableTop from "./table-top.js";
import Config from "./config.js";
import GameAssets from "./game-assets.js";
import App from "./ui-components/app.js";
import { h, render } from "preact";
import htm from "htm";

const html = htm.bind(h);

const config = new Config({
  name: "Test Map",
  width: 15,
  height: 15,
  cellsize: 100,
  backgroundImage: "public/bg.jpg",
  resolution: 1,
  backgroundColor: 0x8f8f8f,
  gridTransparency: 1,
});

const tokens = ["public/nothic.png", "public/nothic.png", "public/nothic.png"];

const state = new GameState();
const assets = new GameAssets();
const app = new TableTop({ config, state, assets });

render(
  html`<${App}
    tokens="${tokens}"
    copy="${app.createTokenAtCoords.bind(app)}"
  />`,
  document.getElementById("sidebar")
);

app.run().catch((err) => {
  console.error(err);
});
