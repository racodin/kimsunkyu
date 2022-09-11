import Canvas from "../common/canvas.js";
import Vector from "../common/Vector.js";
import Spring from "./Spring.js";

let canvas;
let y = 250;
let bob;
let anchor;
let velocity;
let gravity;
let restLength = 200;
let k = 0.01;
let mouseX;
let mouseY;
let mouseIsPressed = false;

function createcanvas() {
  canvas = new Canvas({
    id: "spring",
    width: 600,
    height: 400,
  });
}

function update() {
  canvas.background("#000");

  const ctx = canvas.ctx;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(anchor.x, anchor.y, 32, 0, Math.PI * 2);
  ctx.arc(bob.x, bob.y, 32, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(anchor.x, anchor.y);
  ctx.lineTo(bob.x, bob.y);
  ctx.closePath();
  ctx.stroke();

  if (mouseIsPressed) {
    bob.x = mouseX;
    bob.y = mouseY;
    velocity.set(0, 0);
  }

  let force = Vector.sub(bob, anchor);
  let x = force.mag() - restLength;
  force.normalize();
  force.mult(-1 * k * x);

  // // F = A
  // velocity += force;
  // y += velocity;
  // velocity *= 0.99;
  velocity.add(force);
  velocity.add(gravity);
  bob.add(velocity);
  velocity.mult(0.99);

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

function init() {
  createcanvas();
  bob = new Spring(300, 250);
  anchor = new Spring(350, 0);
  gravity = new Vector(0, 0.1);
  update();
  addEventListener("mousedown", mouseDown);
  addEventListener("mouseup", mouseUp);
  addEventListener("mousemove", mousemove);
}

init();
