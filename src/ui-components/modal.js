import { h } from "preact";
import htm from "htm";
import SettingsForm from "./settings-form.js";

const html = htm.bind(h);

const Modal = ({ show }) =>
  show
    ? html`<div id="modal-overlay">
        <${SettingsForm}><//>
      </div>`
    : html``;

export default Modal;
