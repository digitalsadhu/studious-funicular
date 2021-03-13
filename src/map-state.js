import EventEmitter from "eventemitter3";

const events = Symbol("events");
const populate = Symbol("populate");

const clone = (val) => JSON.parse(JSON.stringify(val));

export default class MapState {
  constructor() {
    this.selectedCell;
    this.selectedToken;
    this.tokens = [];
    this[events] = new EventEmitter();
  }

  get events() {
    return this[events];
  }

  async load() {
    const store = window.localStorage;
    const state = store.getItem("atlas:state");
    this[populate](JSON.parse(state || "{}"));
  }

  async save() {
    const store = window.localStorage;
    store.setItem(
      "atlas:state",
      JSON.stringify({
        selectedCell: this.selectedCell,
        selectedToken: this.selectedToken,
        tokens: clone(this.tokens),
      })
    );
    this[events].emit("state:update");
  }

  addToken(token) {
    this.tokens.push(token);
    return this;
  }

  [populate](state) {
    this.selectedToken = state.selectedToken;
    this.selectedCell = state.selectedCell;
    this.tokens = clone(state.tokens);
  }
}
