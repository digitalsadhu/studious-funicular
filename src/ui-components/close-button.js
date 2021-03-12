import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const CloseButton = ({ close }) =>
  html`<button id="close-button" onClick="${close}">close</button>`;

export default CloseButton;
