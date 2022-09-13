import Vector from "../common/Vector.js";

export default class Ball {
  constructor({
    x = 0,
    y = 0,
    radius = 10,
    color = "#fff",
    friction = 0.9,
  } = {}) {
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector(x, y);
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.friction = friction;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.mult(this.friction); // 0.99
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
}
