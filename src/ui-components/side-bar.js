import { h, Component } from "preact";
import htm from "htm";
import Token from "./token.js";

const html = htm.bind(h);

class SideBar extends Component {
  constructor() {
    super();
  }

  render({ tokens, dropToken, openSettings, openBackgrounds }) {
    return html`<div id="sidebar">
      <button id="settings-button" onClick="${() => openSettings()}">
        Settings
      </button>
      <button id="backgrounds-button" onClick="${() => openBackgrounds()}">
        Backgrounds
      </button>
      <div id="token-container">
        <ul>
          ${tokens.map(
            (token) => html`<${Token} src="${token}" copy="${dropToken}"><//>`
          )}
        </ul>
        <button id="new-token">+</button>
      </div>
    </div>`;
  }
}
export default SideBar;
