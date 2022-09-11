import Vector from "../common/Vector.js";

export default class Ball {
  constructor({ x = 0, y = 0, radius = 10, color = "#fff" } = {}) {
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.velocity.mult(3);
    this.radius = radius;
    this.color = color;
  }

  ease({ x = 0, y = 0 }) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  update() {
    this.position.add(this.velocity);
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
