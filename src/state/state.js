import Settings from "./settings.js";
import Tokens from "./tokens.js";
import Background from "./background.js";
import LocalStorageAdapter from "./adapters/local-storage.js";
// import HttpAdapter from "./adapters/http.js";
import EventEmitter from "eventemitter3";

const events = Symbol("events");
const settings = Symbol("settings");
const _tokens = Symbol("_tokens");
const background = Symbol("background");
const localStorageAdapter = Symbol("localStorageAdapter");
const httpAdapter = Symbol("httpAdapter");

export default class State {
  constructor(adapter = new LocalStorageAdapter()) {
    this[events] = new EventEmitter();
    this[localStorageAdapter] = adapter;
    // this[httpAdapter] = new HttpAdapter();
    this[settings] = new Settings();
    this[_tokens] = new Tokens(this[events], this[localStorageAdapter]);
    this[background] = new Background();
  }

  on(event, handler) {
    this[events].on(event, handler);
  }

  get tokens() {
    return this[_tokens];
  }

  get background() {
    return this[background];
  }

  set background(value) {
    if (!value.src) {
      throw new Error(
        'Value given to property "background is invalid. Value must be an object with property "src"'
      );
    }
    const changed = this[background].set(value);
    if (changed) {
      this[events].emit("state:background:update", this[background]);
      this[localStorageAdapter].set("state:background", this[background]);
    }
  }

  get settings() {
    return this[settings];
  }

  set settings(values) {
    if (typeof values === "string" || typeof values === "number") {
      throw new Error(
        `Invalid settings. Expected object with valid keys, got "${values}"`
      );
    }
    const validValues = [
      "name",
      "width",
      "height",
      "cellsize",
      "resolution",
      "backgroundColor",
      "gridTransparency",
      "gridColor",
    ];
    for (const key of Object.keys(values)) {
      if (!validValues.includes(key)) {
        throw new Error(
          `Invalid setting "${key}" specified when updating settings. Can only be one of ${JSON.stringify(
            validValues
          )}`
        );
      }
    }
    const changed = this[settings].set(values);
    if (changed) {
      this[events].emit("state:settings:update", this.settings);
      this[localStorageAdapter].set("state:settings", this.settings);
    }
  }

  async load() {
    this.background = this[localStorageAdapter].get("state:background");
    this.settings = this[localStorageAdapter].get("state:settings") || {};

    const tokens = new Map(this[localStorageAdapter].get("state:tokens"));
    if (tokens) {
      for (const value of tokens.values()) {
        this[_tokens].add(value);
      }
    }

    this[events].emit("state:load", {
      tokens: this[_tokens],
      settings: this.settings,
      background: this.background,
    });
  }
}
