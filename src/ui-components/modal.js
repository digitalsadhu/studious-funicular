import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const Modal = ({ show, close, children }) =>
  show
    ? html`<div id="modal-overlay">
        ${children}
        <button id="close-button" onClick="${close}">close</button>
      </div>`
    : html``;

export default Modal;
