export default class Particle {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    color = "#ffffff",
    shape = "circle",
    opacity = 1,
    size = 1,
    boundary = "out",
    canvas = null,
  } = {}) {
    this.position = position;
    this.velocity = velocity;
    this.color = this.hexToRgb(color);
    this.shape = shape;
    this.opacity = opacity;
    this.size = size;
    this.boundary = boundary;
    this.width = canvas.width;
    this.height = canvas.height;

    if (this.boundary !== "bounce") {
      this.boundary = {
        left: -this.size,
        right: this.width + this.size,
        top: -this.size,
        bottom: this.height + this.size,
      };
    }
  }

  done() {
    return this.lefttime < 0;
  }

  hexToRgb(hex) {
    return hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));
  }

  checkBoundary() {
    if (this.boundary === "bounce") {
      if (this.position.x + this.size > this.width)
        this.velocity.x = -this.velocity.x;
      else if (this.position.x - this.size < 0)
        this.velocity.x = -this.velocity.x;
      if (this.position.y + this.size > this.height)
        this.velocity.y = -this.velocity.y;
      else if (this.position.y - this.size < 0)
        this.velocity.y = -this.velocity.y;
    } else {
      if (this.position.x - this.size > this.width)
        this.position.x = this.boundary.left;
      else if (this.position.x + this.size < 0)
        this.position.x = this.boundary.right;
      if (this.position.y - this.size > this.height)
        this.position.y = this.boundary.top;
      else if (this.position.y + this.size < 0)
        this.position.y = this.boundary.bottom;
    }
  }

  update() {
    this.checkBoundary();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  render(ctx) {
    ctx.fillStyle = "rgba(" + this.color + "," + this.opacity + ")";
    ctx.beginPath();
    // 파티클 모양 선택
    switch (this.shape) {
      case "triangle":
        ctx.moveTo(this.position.x, this.position.y - this.size);
        ctx.lineTo(
          this.position.x + this.size,
          this.position.y + this.size / 2
        );
        ctx.lineTo(
          this.position.x - this.size,
          this.position.y + this.size / 2
        );
        break;
      case "square":
        ctx.rect(
          this.position.x - this.size,
          this.position.y - this.size,
          this.size * 2,
          this.size * 2
        );
        break;
      case "polygon":
        ctx.moveTo(
          this.position.x + this.size * Math.cos(0),
          this.position.y + this.size * Math.sin(0)
        );
        for (let i = 1; i <= 5; i++) {
          ctx.lineTo(
            this.position.x + this.size * Math.cos((i * 2 * Math.PI) / 5),
            this.position.y + this.size * Math.sin((i * 2 * Math.PI) / 5)
          );
        }
        break;
      case "star":
        const cx = this.position.x;
        const cy = this.position.y;
        const spikes = 5;
        const outerRadius = this.size;
        const innerRadius = this.size / 2;

        let rot = (Math.PI / 2) * 3;
        let x = this.position.x;
        let y = this.position.y;
        let step = Math.PI / spikes;

        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        break;
      default:
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        break;
    }
    ctx.fill();
    ctx.closePath();
  }
}
