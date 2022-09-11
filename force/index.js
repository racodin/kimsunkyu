import Canvas from "../common/canvas.js";
import Vector from "../common/Vector.js";
import Ball from "./Ball.js";
import Water from "./Water.js";

let canvas;
let water;
let balls = [];
let isAnimate = true;

function createcanvas() {
  canvas = new Canvas({
    id: "force",
    width: "100%",
    height: "100%",
  });
}

function createBall() {
  const total = canvas.width / 100;
  for (let i = 0; i < total; i++) {
    balls.push(
      new Ball({
        x: i * (canvas.width / 9) + 50,
        y: 0,
        mass: Math.random() * 7 + 3,
      })
    );
  }
}

function createwater() {
  water = new Water({
    x: 0,
    y: canvas.height / 2,
    width: canvas.width,
    height: canvas.height / 2,
    friction: 0.3,
    color: "#67c1ca",
  });
}

function update() {
  canvas.background("#000000");
  water.render(canvas.ctx);

  balls.forEach((ball) => {
    if (water.includes(ball)) {
      let dragForce = water.calculateDrag(ball);
      ball.applyForce(dragForce);
    }
    let gravity = new Vector(0, 0.1 * ball.mass);
    ball.applyForce(gravity);
    if (isAnimate) ball.update();
    ball.render(canvas.ctx);
    ball.boundary(canvas.width, canvas.height);
  });
  requestAnimationFrame(update);
}

function resize() {
  isAnimate = false;
  clearTimeout(window.resizeFinished);
  window.resizeFinished = setTimeout(() => (isAnimate = true), 500);
  canvas.resize(window.innerWidth, window.innerHeight);
  water.resize(window.innerWidth, window.innerHeight / 2);
}

function init() {
  createcanvas();
  createwater();
  createBall();
  update();
  addEventListener("resize", resize);
}

init();
