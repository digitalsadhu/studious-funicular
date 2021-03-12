import { h } from "preact";
import htm from "htm";
import TokenList from "./token-list.js";

const html = htm.bind(h);

const SideBar = (props) => {
  const { tokens, copy } = props;
  return html`<div id="token-container">
    <${TokenList} tokens=${tokens} copy=${copy}><//>
  </div>`;
};

export default SideBar;
