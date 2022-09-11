import Vector from "../common/Vector.js";

export default class Spring {
  constructor(x, y) {
    this.acceleration = new Vector();
    this.velocity = new Vector();
    this.position = new Vector(x, y);
    this.mass = 1;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  render(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 32, 0, Math.PI * 2);
    ctx.fill();
  }
}
