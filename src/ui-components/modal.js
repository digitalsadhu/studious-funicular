import { h } from "preact";
import htm from "htm";
import SettingsForm from "./settings-form.js";
import CloseButton from "./close-button.js";

const html = htm.bind(h);

const Modal = ({ show, close, updateSettings, initialSettings }) =>
  show
    ? html`<div id="modal-overlay">
        <${SettingsForm}
          submit="${updateSettings}"
          initialSettings="${initialSettings}"
        ><//>
        <${CloseButton} close="${close}"><//>
      </div>`
    : html``;

export default Modal;
