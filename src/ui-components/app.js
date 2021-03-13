import { h, Component } from "preact";
import htm from "htm";
import SideBar from "./side-bar.js";
import Modal from "./modal.js";
import SettingsForm from "./settings-form.js";
import BackgroundsForm from "./backgrounds-form.js";

const html = htm.bind(h);

class App extends Component {
  constructor() {
    super();
    this.state = { show: false, backgrounds: false, settings: false };
  }

  render(props, state) {
    const {
      tokens,
      dropToken,
      updateSettings,
      initialSettings,
      backgrounds,
      pickBackground,
    } = props;
    return html`
      <${SideBar}
        tokens="${tokens}"
        dropToken="${dropToken}"
        openSettings="${() =>
          this.setState({ show: true, backgrounds: false, settings: true })}"
        openBackgrounds="${() =>
          this.setState({ show: true, backgrounds: true, settings: false })}"
      ><//>
      <${Modal}
        show=${state.show}
        close=${() => this.setState({ show: false })}
      >
        ${state.settings
          ? html`<${SettingsForm}
              submit="${updateSettings}"
              initialSettings="${initialSettings}"
            ><//>`
          : html``}
        ${state.backgrounds
          ? html`<${BackgroundsForm}
              select="${pickBackground}"
              backgrounds="${backgrounds}"
            ><//>`
          : html``}
      <//>
    `;
  }
}
export default App;
