export default class Missile {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    color = "white",
  } = {}) {
    this.position = position;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
