import { h, render } from "preact";
import htm from "htm";
import TableTop from "./table-top.js";
import Config from "./config.js";
import App from "./ui-components/app.js";
import Assets from "./assets.js";
import MapState from "./map-state.js";

const html = htm.bind(h);

const main = async () => {
  const config = new Config();
  const assets = new Assets();
  const state = new MapState();

  await Promise.all([config.load(), assets.load(), state.load()]);

  const app = new TableTop({ config, assets, state });
  await app.run();

  render(
    html`<${App}
      tokens="${assets.tokens}"
      dropToken="${(token) => state.addToken(token).save()}"
      backgrounds="${assets.backgrounds}"
      pickBackground="${(image) => config.save({ backgroundImage: image })}"
      initialSettings="${config}"
      updateSettings="${(settings) => config.save(settings)}"
    />`,
    document.getElementById("app")
  );
};

main().catch((err) => {
  console.error(err);
});
