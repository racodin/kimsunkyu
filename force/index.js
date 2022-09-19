import Stats from "../lib/stats.module.js";
import * as dat from "../lib/dat.gui.module.js";
import Canvas from "../common/canvas.js";
import Vector from "../common/Vector.js";
import Ball from "./Ball.js";
import Water from "./Water.js";

let stats;
let gui;

let canvas;
let water;
let balls = [];
let isAnimate = true;

const config = {
  friction: 0.2,
  height: 300,
};

function createControl() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  gui = new dat.GUI();
  gui.add(config, "friction", 0.05, 0.3, 0.05).onChange(() => {
    reset();
  });
  gui.add(config, "height", 150, 600, 10).onChange(() => {
    reset();
  });
}

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
        color: "rgba(255,255,255,0.5)",
      })
    );
  }
}

function createwater() {
  water = new Water({
    x: 0,
    y: canvas.height - config.height,
    width: canvas.width,
    height: config.height,
    friction: config.friction,
    color: "#67c1ca",
  });
}

function update() {
  stats.begin();
  canvas.background("#222");
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
  stats.end();
  requestAnimationFrame(update);
}

function reset() {
  water = null;
  balls = [];
  createwater();
  createBall();
}

function resize() {
  isAnimate = false;
  clearTimeout(window.resizeFinished);
  window.resizeFinished = setTimeout(() => (isAnimate = true), 500);
  canvas.resize(window.innerWidth, window.innerHeight);
  water.resize(window.innerWidth, window.innerHeight / 2);
}

function init() {
  createControl();
  createcanvas();
  createwater();
  createBall();
  update();
  addEventListener("resize", resize);
}

init();
