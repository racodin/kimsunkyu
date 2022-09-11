import Canvas from "../common/Canvas.js";
import Ease from "../common/Ease.js";
import Ball from "./Ball.js";

let canvas;
let balls = [];
let mouseX = 0;
let mouseY = 0;

function createCanvas() {
  canvas = new Canvas({
    id: "easing",
    width: 800,
    height: 600,
  });
}

function createBall() {
  balls.push(new Ball({ x: 50, y: 100, radius: 30, color: "#fff" }));
}

function update() {
  canvas.background("#000000");
  balls.forEach((ball) => {
    // ball.ease({
    //   x: (mouseX - ball.position.x) * 0.1,
    //   y: (mouseY - ball.position.y) * 0.1,
    // });

    ball.velocity.x = Ease.OutQuad({
      start: ball.position.x,
      end: mouseX,
      speed: 0.1,
    });
    ball.velocity.y = Ease.OutQuad({
      start: ball.position.y,
      end: mouseY,
      speed: 0.1,
    });

    ball.update();
    ball.render(canvas.ctx);
  });

  requestAnimationFrame(update);
}

function mousemove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function init() {
  createCanvas();
  createBall();
  update();
  addEventListener("mousemove", mousemove);
}

init();
