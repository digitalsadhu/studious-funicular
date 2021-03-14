export default class Assets {
  constructor() {
    this.tokens = [];
    this.backgrounds = [];
  }

  async load() {
    this.backgrounds = [
      "public/backgrounds/grass-grid.jpg",
      "public/backgrounds/sand-grid.jpg",
      "public/backgrounds/stone-grid.jpg",
      "public/backgrounds/water-grid.jpg",
      "public/backgrounds/wood-grid.jpg",
    ];
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
