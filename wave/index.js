import Stats from "../lib/stats.module.js";
import * as dat from "../lib/dat.gui.module.js";
import Canvas from "../common/canvas.js";
import Wave from "./Wave.js";

let stats;
let gui;

let canvas;
let waves = [];

const config = {
  wave: 1,
  points: 10,
  wavelength: 2,
  amplitude: 60,
  speed: 0.5,
};

function createControl() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  gui = new dat.GUI();
  gui.add(config, "wave", 1, 5, 1).onChange(() => {
    reset();
  });
  gui.add(config, "points", 3, 30, 1).onChange(() => {
    reset();
  });
  gui.add(config, "wavelength", 1, 10, 1).onChange(() => {
    reset();
  });
  gui.add(config, "amplitude", 10, 200, 10).onChange(() => {
    reset();
  });
  gui.add(config, "speed", 0.1, 2, 0.1).onChange(() => {
    reset();
  });
}

function createcanvas() {
  canvas = new Canvas({
    id: "wave",
    width: "100%",
    height: "100%",
  });
}

function createInstance() {
  for (let i = 0; i < config.wave; i++) {
    waves.push(
      new Wave({
        canvas: canvas,
        index: i,
        points: config.points,
        wavelength: config.wavelength,
        amplitude: config.amplitude,
        speed: config.speed,
      })
    );
  }
}

function update() {
  stats.begin();
  canvas.background("#222");

  waves.forEach((wave) => {
    wave.update();
    wave.render();
  });

  stats.end();
  requestAnimationFrame(update);
}

function reset() {
  waves = [];
  createInstance();
}

function init() {
  createControl();
  createcanvas();
  createInstance();
  update();
}

init();
