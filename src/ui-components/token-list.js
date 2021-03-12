import UIComponent from "./ui-component.js";
import Token from "./token.js";

export default class TokenList extends UIComponent {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      tokens: this.props.tokens.map(
        (token) => new Token({ src: token, copy: this.props.copy })
      ),
    };
  }
  render() {
    const el = this.template(`<ul></ul>`);
    for (const token of this.state.tokens) {
      el.appendChild(token.render());
    }
    return el;
  }
}
