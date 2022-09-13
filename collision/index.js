import Stats from "../lib/stats.module.js";
import * as dat from "../lib/dat.gui.module.js";
import Canvas from "../common/Canvas.js";
import Ball from "./Ball.js";

let stats;
let gui;

let canvas;
let balls = [];
let isAnimate = true;

const config = {
  balls: 6,
  speed: 5,
  collision: true,
  random: true,
};

function createControl() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  gui = new dat.GUI();

  gui.add(config, "balls", 2, 20, 1).onChange(() => {
    reset();
  });
  gui.add(config, "speed", 1, 10, 1).onChange(() => {
    reset();
  });
  gui.add(config, "collision").onChange(() => {
    reset();
  });
  gui.add(config, "random").onChange(() => {
    reset();
  });
}

function createCanvas() {
  canvas = new Canvas({
    id: "collision",
    width: "100%",
    height: "100%",
  });
}

function createBall() {
  for (let i = 0; i < config.balls; i++) {
    const opt = {
      x: 150 * (i % Math.floor(canvas.width / 150)) + 120,
      y: 150 * Math.floor(i / Math.floor(canvas.width / 150)) + 120,
      radius: 40,
      speed: config.speed,
      color: "rgba(255,255,255,0.5)",
    };
    if (config.random) {
      opt.radius = Math.random() * 50 + 10;
    }
    balls.push(new Ball(opt));
  }
}

function update() {
  stats.begin();
  canvas.background("#222");
  balls.forEach((ball) => {
    if (isAnimate) ball.update();
    ball.render(canvas.ctx);
    ball.boundaryCollision({
      width: canvas.width,
      height: canvas.height,
    });
    if (config.collision) {
      balls.forEach((ohters) => {
        if (ball !== ohters) {
          ball.collision(ohters);
        }
      });
    }
  });
  stats.end();
  requestAnimationFrame(update);
}

function reset() {
  balls = [];
  createBall();
}

function resize() {
  isAnimate = false;
  clearTimeout(window.resizeFinished);
  window.resizeFinished = setTimeout(() => (isAnimate = true), 500);
  canvas.resize(window.innerWidth, window.innerHeight);
}

function init() {
  createControl();
  createCanvas();
  createBall();
  update();
  addEventListener("resize", resize);
}

init();
