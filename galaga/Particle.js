export default class Particle {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    radius = 3,
    opacity = 1,
    color = "white",
    fade = false,
  }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = opacity;
    this.fade = fade;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.fade) this.opacity -= 0.05;
  }
}
