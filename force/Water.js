export default class Water {
  constructor({
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    friction = 0,
    color = "#666",
  } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.friction = friction;
    this.color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  includes(target) {
    let tp = target.position;
    return (
      tp.x > this.x &&
      tp.x < this.x + this.width &&
      tp.y > this.y &&
      tp.y < this.y + this.height
    );
  }

  calculateDrag(target) {
    let speed = target.velocity.mag();
    let dragMagnitude = this.friction * speed * speed;
    let dragForce = target.velocity.copy();
    dragForce.mult(-1);
    dragForce.normalize();
    dragForce.mult(dragMagnitude);
    return dragForce;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}
