import Vector from "../common/Vector.js";

export default class Ball {
  constructor({
    x = 0,
    y = 0,
    radius = 10,
    color = "#fff",
    mass = 0.9,
    gravity = 0.1,
  } = {}) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.gravity = new Vector(0, gravity);

    this.stiffness = 0.2;
    this.damping = 0.7;
  }

  update(target) {
    let force = Vector.sub(target, this.position);
    force.mult(this.stiffness / this.mass);
    force.add(this.gravity);

    this.velocity.add(force);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
  }

  render(ctx, target) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
  }
}
