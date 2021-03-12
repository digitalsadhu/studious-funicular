import { h, Component } from "preact";
import htm from "htm";
import SideBar from "./side-bar.js";
import Modal from "./modal.js";

const html = htm.bind(h);

class App extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }

  render(props, state) {
    const { tokens, copy } = props;
    const { show } = state;
    return html`
      <${SideBar}
        tokens="${tokens}"
        copy="${copy}"
        openSettings="${() => this.setState({ show: true })}"
      ><//>
      <${Modal} show=${show}><//>
    `;
  }
}
export default App;
