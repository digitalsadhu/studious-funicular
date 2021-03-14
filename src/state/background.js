export default class Background {
  constructor() {
    this.src = "";
  }

  set({ src } = {}) {
    if (src && src !== this.src) {
      this.src = src;
      return true;
    }
    return false;
  }
}
