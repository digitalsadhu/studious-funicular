import GameState from "./game-state.js";
import Application from "./application.js";
import Config from "./config.js";
import GameAssets from "./game-assets.js";

const config = new Config({
  width: 30,
  height: 30,
  cellsize: 50,
  background: "public/media/bg.jpg",
  resolution: 1,
  backgroundColor: '',
});
const state = new GameState();
const assets = new GameAssets();
const app = new Application({ config, state, assets });

app.run().catch(err => {
  console.error(err);
})

