import Vector from "../common/Vector.js";
export default class Spring {
  constructor({
    width = 50,
    tension = 0.1,
    restLength = 200,
    a = undefined,
    b = undefined,
  } = {}) {
    this.width = width;
    this.tension = tension;
    this.restLength = restLength;
    this.a = a;
    this.b = b;
    this.numOfRound = this.tension * 50 + 2;
  }

  update() {
    let force = Vector.sub(this.b.position, this.a.position);
    let y = force.mag() - this.restLength;
    force.normalize();
    force.mult(this.tension * (this.a.radius * 0.01) * y);
    this.a.applyForce(force);
  }

  render(ctx) {
    const gapOfRound = (this.a.position.y - this.a.radius) / this.numOfRound;
    const center = this.b.position.x;
    const springWidth = 120;
    const startY = 20;

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(center, this.b.position.y);
    ctx.lineTo(center, this.b.position.y + startY);

    for (let i = 0; i < this.numOfRound - 1; i++) {
      ctx.bezierCurveTo(
        center - springWidth,
        gapOfRound * i + gapOfRound / 2 + startY,
        center + springWidth,
        gapOfRound * i + gapOfRound / 2 + startY,
        this.b.position.x,
        gapOfRound * i + gapOfRound + startY
      );
    }

    ctx.lineTo(this.a.position.x, this.a.position.y - this.a.radius);
    ctx.stroke();

    ctx.font = "18px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText("Drag", this.a.position.x - 22, this.a.position.y + 7);
  }
}
