import { Container } from "pixi.js";
import Token from "./token.js";

export default class TokenCollection {
  constructor(state) {
    this.state = state;
    this.tokens = [];
    this.layer = new Container();
  }

  add(token) {
    if (token instanceof Token) {
      this.tokens.push(token);
      token.layer.click = () => {
        this.tokens.forEach((t) => {
          t.unselect();
        });
        this.state.selectedToken = token;
        token.select();
      };
      this.layer.addChild(token.layer);
    } else {
      throw new Error(
        '"token" must be an instance of class Token when calling TokenCollection.add'
      );
    }
  }

  remove(val) {}
}
