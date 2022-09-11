import Canvas from "../common/Canvas.js";
import Ball from "./Ball.js";

let canvas;
let balls = [];
let isAnimate = true;

function createCanvas() {
  canvas = new Canvas({
    id: "collision",
    width: "100%",
    height: "100%",
  });
}

function createBall() {
  balls.push(new Ball({ x: 50, y: 100, radius: 40, color: "#fff" }));
  balls.push(new Ball({ x: 300, y: 400, radius: 80, color: "#999" }));
  balls.push(new Ball({ x: 100, y: 500, radius: 60, color: "#666" }));
  balls.push(new Ball({ x: 400, y: 200, radius: 50, color: "#333" }));
}

function update() {
  canvas.background("#000000");
  balls.forEach((ball) => {
    if (isAnimate) ball.update();
    ball.render(canvas.ctx);
    ball.boundaryCollision({
      width: canvas.width,
      height: canvas.height,
    });
    balls.forEach((ohters) => {
      if (ball !== ohters) {
        ball.collision(ohters);
      }
    });
  });

  requestAnimationFrame(update);
}

function resize() {
  isAnimate = false;
  clearTimeout(window.resizeFinished);
  window.resizeFinished = setTimeout(() => (isAnimate = true), 500);
  canvas.resize(window.innerWidth, window.innerHeight);
}

function init() {
  createCanvas();
  createBall();
  update();
  addEventListener("resize", resize);
}

init();
