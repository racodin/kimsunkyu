import Stats from "../lib/stats.module.js";
import * as dat from "../lib/dat.gui.module.js";
import Canvas from "../common/canvas.js";
import Particles from "./Particles.js";

let stats;
let gui;

let canvas;
let particles;

const config = {
  emitter: "box", // point, box
  number: 100,
  speed: 3,
  boundary: "out", // out, bounce
  shape: "circle", // circle, triangle, square, polygon, star, image
  direction: "none", // none, top, right, bottom, left
  color: "#ffffff",
  colorRandom: false,
  opacity: 1,
  opacityRandom: true,
  size: 10,
  sizeRandom: true,
};

function createControl() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  gui = new dat.GUI();
  gui.add(config, "emitter", ["box", "point"]).onChange(() => {
    reset();
  });
  gui.add(config, "number", 1, 500, 1).onChange(() => {
    reset();
  });
  gui.add(config, "speed", 1, 10, 1).onChange(() => {
    reset();
  });
  gui.add(config, "boundary", ["out", "bounce"]).onChange(() => {
    reset();
  });
  gui
    .add(config, "shape", [
      "circle",
      "triangle",
      "square",
      "square",
      "polygon",
      "star",
    ])
    .onChange(() => {
      reset();
    });
  gui
    .add(config, "direction", ["none", "top", "right", "bottom", "left"])
    .onChange(() => {
      reset();
    });
  gui.addColor(config, "color").onChange(() => {
    reset();
  });
  gui.add(config, "colorRandom").onChange(() => {
    reset();
  });
  gui.add(config, "opacity", 0.1, 1, 0.1).onChange(() => {
    reset();
  });
  gui.add(config, "opacityRandom").onChange(() => {
    reset();
  });
  gui.add(config, "size", 3, 50, 1).onChange(() => {
    reset();
  });
  gui.add(config, "sizeRandom").onChange(() => {
    reset();
  });
}

function createcanvas() {
  canvas = new Canvas({
    id: "particles",
    width: "100%",
    height: "100%",
  });
  config.canvas = canvas;
}

function createInstance() {
  particles = new Particles(config);
}

function update() {
  stats.begin();
  canvas.background("#222");

  particles.update();
  particles.render(canvas.ctx);

  stats.end();
  requestAnimationFrame(update);
}

function reset() {
  particles = null;
  createInstance();
}

function init() {
  createControl();
  createcanvas();
  createInstance();
  update();
}

init();
