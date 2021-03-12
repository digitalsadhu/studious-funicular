export default class Assets {
  constructor() {
    this.tokens = [];
  }

  async load() {
    this.tokens = [
      "public/token_144.png",
      "public/token_150.png",
      "public/token_146.png",
      "public/token_137.png",
      "public/token_134.png",
      "public/token_133.png",
    ];
  }
}
