import { h, Component } from "preact";
import htm from "htm";
import TokenList from "./token-list.js";
import SettingsButton from "./settings-button.js";

const html = htm.bind(h);

class SideBar extends Component {
  constructor() {
    super();
  }

  render({ tokens, copy, openSettings }) {
    return html`<div id="sidebar">
      <${SettingsButton} open="${openSettings}"><//>
      <div id="token-container">
        <${TokenList} tokens=${tokens} copy=${copy}><//>
        <button id="new-token">+</button>
      </div>
    </div>`;
  }
}
export default SideBar;
