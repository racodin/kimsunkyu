import Vector from "../common/Vector.js";

export default class Particle {
  constructor({
    x = 0,
    y = 0,
    vx = 0,
    vy = 0,
    ax = 0,
    ay = 0,
    gravity = 0,
    friction = 1,
    mass = 1,
    radius = 10,
    speed = 3,
    style = {
      fillColor: "rgba(255,255,255,0.5)",
      stroke: true,
      strokeColor: "#fff",
      strokeWidth: 2,
    },
  } = {}) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(vx, vy);
    this.velocity.mult(speed);
    this.acceleration = new Vector(ax, ay);
    this.gravity = new Vector(0, gravity);
    this.friction = friction;
    this.mass = mass;
    this.radius = radius;
    this.style = style;
  }

  boundary({ width = 500, height = 300 }) {
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    } else if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }
  }

  applyForce(force) {
    let f = Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    // this.velocity.mult(this.friction); // 0.99
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  render(ctx) {
    ctx.fillStyle = this.style.fillColor;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    if (this.style.stroke) {
      ctx.strokeStyle = this.style.strokeColor;
      ctx.lineWidth = this.style.strokeWidth;
      ctx.stroke();
    }
  }
}
