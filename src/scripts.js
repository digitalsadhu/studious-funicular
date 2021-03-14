import { h, render } from "preact";
import htm from "htm";
import TableTop from "./table-top.js";
import App from "./ui-components/app.js";
import Assets from "./assets.js";
import State from "./state/state.js";

const html = htm.bind(h);

const main = async () => {
  const assets = new Assets();
  await assets.load();

  const state = new State();

  const tabletop = new TableTop({ assets, state });

  render(
    html`<${App}
      assets="${assets}"
      worldState="${state}"
      dropToken="${tabletop.createTokenAtCoords.bind(tabletop)}"
    />`,
    document.getElementById("app")
  );

  await tabletop.run();
  await state.load();
};

main().catch((err) => {
  console.error(err);
});
