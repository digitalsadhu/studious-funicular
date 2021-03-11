import GameState from "./game-state.js";
import Application from "./application.js";
import Config from "./config.js";
import GameAssets from "./game-assets.js";

const config = new Config({
  name: 'Test Map',
  width: 30,
  height: 30,
  cellsize: 50,
  backgroundImage: "public/bg.jpg",
  resolution: 1,
  backgroundColor: 0x8f8f8f,
});
const state = new GameState();
const assets = new GameAssets();
const app = new Application({ config, state, assets });

app.run().catch(err => {
  console.error(err);
})

