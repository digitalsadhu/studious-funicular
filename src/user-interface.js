import UIComponent from "./ui-components/ui-component.js";
import TokenList from "./ui-components/token-list.js";

export default class UserInterface extends UIComponent {
  constructor({ props }) {
    super();
    this.props = props;
    this.state = {
      tokens: new TokenList({
        tokens: this.props.tokens,
        copy: this.props.createToken,
      }),
    };
  }

  render() {
    const el = this.template(`<div id="token-container"></div>`);
    el.appendChild(this.state.tokens.render());
    return el;
  }
}
