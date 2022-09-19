import { GAME_WIDTH, GAME_HEIGHT } from "./Constant.js";

export default class Player {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    width = 10,
    height = 10,
    opacity = 1,
    image = null,
  } = {}) {
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.opacity = opacity;
    this.image = image;
    this.getImage();
  }

  getImage() {
    const image = new Image();
    image.src = "./images/spaceship.png";
    image.onload = () => {
      const scale = 0.3;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: GAME_WIDTH / 2 - this.width / 2,
        y: GAME_HEIGHT - this.height - 15,
      };
    };
  }

  reset() {
    this.opacity = 1;
    this.position = {
      x: GAME_WIDTH / 2 - this.width / 2,
      y: GAME_HEIGHT - this.height - 15,
    };
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.restore();
  }

  update() {
    if (this.image) {
      this.position.x += this.velocity.x;
    }
  }
}
