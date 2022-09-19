import Missile from "./Missile.js";

export default class Enemy {
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
    image.src = "./images/enemy.png";
    image.onload = () => {
      const scale = 0.3;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      // this.position = {
      //   x: position.x,
      //   y: position.y,
      // };
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({ velocity }) {
    if (this.image) {
      // this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  shoot(missiles) {
    missiles.push(
      new Missile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: {
          x: 0,
          y: 5,
        },
      })
    );
  }
}
