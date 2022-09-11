import Vector from "../common/Vector.js";

export default class Ball {
  constructor({ x = 0, y = 0, mass = 0, color = "#fff" }) {
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.acceleration = new Vector();
    this.mass = mass;
    this.color = color;
  }

  applyForce(force) {
    let f = Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.mass * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }

  boundary(width, height) {
    if (this.position.y > height - this.mass * 4) {
      this.velocity.y *= -0.6;
      this.position.y = height - this.mass * 4;
    }
  }
}
