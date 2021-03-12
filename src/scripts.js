import GameState from "./game-state.js";
import TableTop from "./table-top.js";
import Config from "./config.js";
import GameAssets from "./game-assets.js";
import App from "./ui-components/app.js";
import { h, render } from "preact";
import htm from "htm";

const html = htm.bind(h);

const config = new Config();
config.load();

const tokens = ["public/nothic.png", "public/nothic.png", "public/nothic.png"];

const state = new GameState();
const assets = new GameAssets();
const app = new TableTop({ config, state, assets });

render(
  html`<${App}
    tokens="${tokens}"
    copy="${app.createTokenAtCoords.bind(app)}"
    initialSettings="${config}"
    updateSettings="${(settings) => config.save(settings)}"
  />`,
  document.getElementById("app")
);

app.run().catch((err) => {
  console.error(err);
});
