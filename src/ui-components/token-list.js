import { h } from "preact";
import htm from "htm";
import Token from "./token.js";

const html = htm.bind(h);

const TokenList = (props) => {
  const { tokens, copy } = props;
  return html`<ul>
    ${tokens.map((token) => html`<${Token} src="${token}" copy="${copy}"><//>`)}
  </ul>`;
};

export default TokenList;
