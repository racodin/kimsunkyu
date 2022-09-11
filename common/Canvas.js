export default class Canvas {
  constructor({
    id = "canvas",
    width = 600,
    height = 400,
    color = "#fff",
  } = {}) {
    this.canvas;
    this.ctx;
    this.id = id;
    this.width = width;
    this.height = height;
    this.color = color;
    this.create();
  }

  create() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = this.id;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    if (this.width === "100%" && this.height === "100%") {
      this.resize(window.innerWidth, window.innerHeight);
    }
    this.ctx = this.canvas.getContext("2d");
    this.append();
  }

  append(tag = "body") {
    const dom = document.querySelector(tag);
    dom.appendChild(this.canvas);
  }

  style(styles = {}) {
    for (const key in styles) {
      this.canvas.style[key] = styles[key];
    }
  }

  background(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  resize(width, height) {
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
  }
}
