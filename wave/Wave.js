import Vector from "../common/Vector.js";
import Ball from "./Ball.js";

export default class Wave {
  constructor({
    canvas = null,
    index = 0,
    points = 2,
    wavelength = 2,
    amplitude = 0,
    speed = 0.5,
  } = {}) {
    this.canvas = canvas;
    this.index = index;
    this.points = points;
    this.wavelength = wavelength; // 파장
    this.amplitude = amplitude; //진폭
    this.speed = speed * 0.1;

    this.balls = [];
    this.theta = 0.0; // 시작 각도
    this.dx = ((Math.PI * 2) / this.points) * this.wavelength; // x 증가값
    this.createInstance();
  }

  createInstance() {
    for (let i = 0; i < this.points; i++) {
      this.balls.push(
        new Ball({
          x: (this.canvas.width / (this.points - 1)) * i,
          y: this.canvas.height / 2,
          radius: 5,
          index: i,
        })
      );
    }
  }

  update() {
    this.theta += this.speed;
    let x = this.theta + this.index;
    this.balls.forEach((ball) => {
      ball.position.y = Math.sin(x) * this.amplitude + this.canvas.height / 2;
      x += this.dx;
      ball.update();
      ball.render(this.canvas.ctx);
    });
  }

  render() {
    const { ctx, width, height } = this.canvas;

    let prev = this.balls[0];
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(prev.position.x, prev.position.y);

    this.balls.forEach((ball) => {
      const c = Vector.add(prev.position, ball.position).div(2);
      ctx.quadraticCurveTo(prev.position.x, prev.position.y, c.x, c.y);
      prev = ball;
    });

    ctx.lineTo(prev.position.x, prev.position.y);
    ctx.lineTo(width, height);
    ctx.lineTo(this.balls[0].position.x, height);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}
