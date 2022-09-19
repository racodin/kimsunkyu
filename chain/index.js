import Stats from "../lib/stats.module.js";
import * as dat from "../lib/dat.gui.module.js";
import Canvas from "../common/Canvas.js";
import Vector from "../common/Vector.js";
import Ball from "./Ball.js";

let stats;
let gui;

let canvas;
let balls = [];

let mouse;

const config = {
  balls: 15,
  mass: 3,
  gravity: 1.5,
};

function createControl() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  gui = new dat.GUI();
  gui.add(config, "balls", 5, 30, 1).onChange(() => {
    reset();
  });
  gui.add(config, "mass", 2, 5, 1).onChange(() => {
    reset();
  });
  gui.add(config, "gravity", 0.5, 3, 0.5).onChange(() => {
    reset();
  });
}

function createcanvas() {
  canvas = new Canvas({
    id: "chain",
    width: "100%",
    height: "100%",
  });
}

function createBall() {
  for (let i = 0; i < config.balls; i++) {
    balls.push(
      new Ball({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: config.mass,
        mass: config.mass,
        gravity: config.gravity,
        color: "rgba(255,255,255,0.5)",
      })
    );
  }
}

function update() {
  stats.begin();
  canvas.background("#222");

  balls.forEach((ball, idx) => {
    const target = idx === 0 ? mouse : balls[idx - 1].position;
    ball.update(target);
    ball.render(canvas.ctx, target);
  });

  stats.end();
  requestAnimationFrame(update);
}

function mousemove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function reset() {
  balls = [];
  createBall();
}

function init() {
  createControl();
  createcanvas();
  createBall();

  mouse = new Vector(canvas.width / 2, canvas.height / 2);
  update();

  addEventListener("mousemove", mousemove);
}

init();
