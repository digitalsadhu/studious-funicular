import GameState from "./game-state.js";
import Application from "./application.js";
import Config from "./config.js";
import GameAssets from "./game-assets.js";
import UserInterface from "./user-interface.js";

const config = new Config({
  name: "Test Map",
  width: 30,
  height: 30,
  cellsize: 50,
  backgroundImage: "public/bg.jpg",
  resolution: 1,
  backgroundColor: 0x8f8f8f,
  gridTransparency: 1,
});

const tokens = ["public/nothic.png", "public/nothic.png", "public/nothic.png"];

const state = new GameState();
const assets = new GameAssets();
const app = new Application({ config, state, assets });

const ui = new UserInterface({
  props: { ...config, tokens, createToken: app.createTokenAtCoords.bind(app) },
});
document.getElementById("sidebar").appendChild(ui.render());

app.run().catch((err) => {
  console.error(err);
});
