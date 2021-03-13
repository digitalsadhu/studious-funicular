import { h, render } from "preact";
import htm from "htm";
import TableTop from "./table-top.js";
import Config from "./config.js";
import App from "./ui-components/app.js";
import Assets from "./assets.js";

const html = htm.bind(h);

const main = async () => {
  const config = new Config();
  await config.load();

  const assets = new Assets();
  await assets.load();

  const app = new TableTop({ config, assets });
  await app.run();

  render(
    html`<${App}
      tokens="${assets.tokens}"
      dropToken="${app.createTokenAtCoords.bind(app)}"
      backgrounds="${assets.backgrounds}"
      pickBackground="${app.setBackgroundImage.bind(app)}"
      initialSettings="${config}"
      updateSettings="${(settings) => config.save(settings)}"
    />`,
    document.getElementById("app")
  );
};

main().catch((err) => {
  console.error(err);
});
