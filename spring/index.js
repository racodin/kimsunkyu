import Stats from "../lib/stats.module.js";
import * as dat from "../lib/dat.gui.module.js";
import Canvas from "../common/canvas.js";
import Ball from "./Ball.js";
import Spring from "./Spring.js";

let stats;
let gui;

let canvas;
let bob;
let anchor;
let spring;

let mouseX;
let mouseY;
let mouseIsPressed = false;

const config = {
  mass: 50,
  tension: 1.5,
  friction: 1,
};

function createControl() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  gui = new dat.GUI();
  gui.add(config, "mass", 20, 100, 10).onChange(() => {
    reset();
  });
  gui.add(config, "tension", 0.5, 3, 0.5).onChange(() => {
    reset();
  });
  gui.add(config, "friction", 0.1, 2, 0.1).onChange(() => {
    reset();
  });
}

function createcanvas() {
  canvas = new Canvas({
    id: "spring",
    width: "100%",
    height: "100%",
  });
}

function createInstance() {
  bob = new Ball({
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: config.mass,
    color: "rgba(255,255,255,0.5)",
    friction: 1 - config.friction * 0.1,
  });
  anchor = new Ball({
    x: canvas.width / 2,
    y: 0,
    color: "rgba(255,255,255,0.5)",
  });
  spring = new Spring({
    width: config.width,
    tension: config.tension * 0.1,
    restLength: canvas.height / 2,
    a: bob,
    b: anchor,
  });
}

function update() {
  stats.begin();
  canvas.background("#222");

  spring.update();
  bob.update();
  anchor.update();

  spring.render(canvas.ctx);
  bob.render(canvas.ctx);
  anchor.render(canvas.ctx);

  if (mouseIsPressed) {
    bob.position.set(canvas.width / 2, mouseY);
    // bob.position.set(mouseX, mouseY);
    bob.velocity.set(0, 0);
  }
  stats.end();
  requestAnimationFrame(update);
}

function mouseDown() {
  mouseIsPressed = true;
}

function mouseUp() {
  mouseIsPressed = false;
}

function mousemove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function reset() {
  bob = null;
  anchor = null;
  spring = null;
  createInstance();
}

function init() {
  createControl();
  createcanvas();
  createInstance();

  update();

  addEventListener("mousedown", mouseDown);
  addEventListener("mouseup", mouseUp);
  addEventListener("mousemove", mousemove);
}

init();
