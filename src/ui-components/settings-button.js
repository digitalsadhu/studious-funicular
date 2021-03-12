import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const SettingsButton = ({ open }) =>
  html`<button id="settings-button" onClick="${() => open()}">
    Settings
  </button>`;

export default SettingsButton;
