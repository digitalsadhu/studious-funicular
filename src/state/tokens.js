const _events = Symbol("events");
const _adapter = Symbol("events");

export default class Tokens extends Map {
  constructor(events, adapter) {
    super();
    this[_events] = events;
    this[_adapter] = adapter;
  }

  add(token) {
    this.set(token.src, token);
    this[_events].emit("state:tokens:add", token);
    this[_adapter].set("state:tokens", Array.from(this.entries()));
    return this;
  }

  remove(token) {
    if (this.has(token.src)) {
      const success = this.delete(token.src);
      if (success) {
        this[_events].emit("state:tokens:remove", token);
        this[_adapter].set("state:tokens", Array.from(this.entries()));
      }
      return success;
    }
    return false;
  }
}
