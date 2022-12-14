import Particle from "./Particle.js";

export default class Particles {
  constructor({
    canvas = null,
    emitter = "box", // point, box
    number = 40,
    speed = 2,
    direction = "none", // none, top, right, bottom, left
    colorRandom = false,
    opacityRandom = true,
    sizeRandom = true,
    boundary = "out", // out, bounce
    shape = "circle", // circle, triangle, square, polygon, star, image
    color = "#ffffff",
    opacity = 1,
    size = 10,
  } = {}) {
    this.canvas = canvas;
    this.emitter = emitter;
    this.number = number;
    this.speed = speed;
    this.direction = direction;
    this.colorRandom = colorRandom;
    this.opacityRandom = opacityRandom;
    this.sizeRandom = sizeRandom;
    this.width = canvas.width;
    this.height = canvas.height;

    this.boundary = boundary;
    this.shape = shape;
    this.color = color;
    this.opacity = opacity;
    this.size = size;

    this.particleSet = {
      canvas,
      boundary,
      shape,
      color,
      opacity,
      size,
    };

    this.particles = [];

    this.addParticle();
  }

  setDirection() {
    let velocity = {};
    switch (this.direction) {
      case "top":
        velocity = { x: 0, y: -1 };
        break;
      case "bottom":
        velocity = { x: 0, y: 1 };
        break;
      case "left":
        velocity = { x: -1, y: 0 };
        break;
      case "right":
        velocity = { x: 1, y: 0 };
        break;
    }

    if (this.direction === "none") {
      // this.particleSet.velocity = {
      //   x: Math.cos(Math.random() * (Math.PI * 2)) * this.speed,
      //   y: Math.sin(Math.random() * (Math.PI * 2)) * this.speed,
      // };
      this.particleSet.velocity = {
        x: (Math.random() * 1 - 0.5) * this.speed,
        y: (Math.random() * 1 - 0.5) * this.speed,
      };
    } else {
      this.particleSet.velocity = {
        x: (velocity.x + Math.random() - 0.5) * this.speed,
        y: (velocity.y + Math.random() - 0.5) * this.speed,
      };
    }
  }

  setEmitter() {
    switch (this.emitter) {
      case "point": // ????????? ???????????? ??????
        this.particleSet.position = {
          x: this.width / 2,
          y: this.height / 2,
        };
        break;
      case "box": // ????????? ????????? ??????
        this.particleSet.position = {
          x: this.width * Math.random(),
          y: this.height * Math.random(),
        };
        break;
    }
  }

  addParticle() {
    for (let i = 0; i < this.number; i++) {
      // ????????? ?????? ??????
      this.setDirection();

      // ????????? emitter ??????
      this.setEmitter();

      // ????????? opacity ?????? ??????
      if (this.colorRandom) {
        this.particleSet.color =
          "#" + Math.round(Math.random() * 0xffffff).toString(16);
      }

      // ????????? opacity ?????? ??????
      if (this.opacityRandom) {
        this.particleSet.opacity = Math.random() * this.opacity;
      }

      // ????????? size ?????? ??????
      if (this.sizeRandom) {
        this.particleSet.size = Math.random() * (this.size - 1) + 1;
      }

      this.particles.push(new Particle(this.particleSet));
    }
  }

  update() {
    this.particles.forEach((particle) => {
      particle.update();
    });
  }

  render(ctx) {
    this.particles.forEach((particle) => {
      particle.render(ctx);
    });
  }
}
