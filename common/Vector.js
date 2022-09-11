"use strict";
/**
 * @module Vector
 */

export default class Vector {
  /**
   * @class Vector
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x = 0, y = 0) {
    if (typeof x !== "number") {
      throw Error("매개변수에 오류가 있습니다.");
    }
    this.x = x;
    this.y = y;
  }

  /** 복사 */
  copy() {
    return new Vector(this.x, this.y, this.z);
  }

  /** 설정 */
  set(x = 0, y = 0, z = 0) {
    if (x instanceof Vector) {
      this.x = x.x;
      this.y = x.y;
    } else if (x instanceof Array) {
      this.x = x[0];
      this.y = x[1];
    } else {
      this.x = x;
      this.y = y;
    }

    return this;
  }

  /** 회전 각도 */
  heading() {
    let h = Math.atan2(this.y, this.x);
    return h;
  }

  /** 더하기 */
  add(x = 0, y = 0, z = 0) {
    if (x instanceof Vector) {
      this.x += x.x;
      this.y += x.y;
    } else if (x instanceof Array) {
      this.x += x[0];
      this.y += x[1];
    } else {
      this.x += x;
      this.y += y;
    }

    return this;
  }

  /** 빼기 */
  sub(x = 0, y = 0, z = 0) {
    if (x instanceof Vector) {
      this.x -= x.x;
      this.y -= x.y;
    } else if (x instanceof Array) {
      this.x -= x[0];
      this.y -= x[1];
    } else {
      this.x -= x;
      this.y -= y;
    }

    return this;
  }

  /** 곱하기 */
  mult(v) {
    if (v instanceof Vector) {
      this.x *= v.x;
      this.y *= v.y;
    } else if (v instanceof Array) {
      this.x *= v[0];
      this.y *= v[1];
    } else {
      this.x *= v;
      this.y *= v;
    }

    return this;
  }

  /** 나누기 */
  div(v) {
    if (v instanceof Vector) {
      this.x /= v.x;
      this.y /= v.y;
    } else if (v instanceof Array) {
      this.x /= v[0];
      this.y /= v[1];
    } else {
      this.x /= v;
      this.y /= v;
    }

    return this;
  }

  /** 크기 */
  mag() {
    return Math.sqrt(this.sq());
  }

  /** 제곱 크기 */
  sq() {
    let x = this.x;
    let y = this.y;
    return x * x + y * y;
  }

  /** 정규화 */
  normalize() {
    let len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  /** 크기 제한 */
  limit(max) {
    let sq = this.sq();
    if (sq > max * max) this.div(Math.sqrt(sq)).mult(max);
    return this;
  }

  /** 두 점 사이의 거리 */
  dist(v) {
    return v.copy().sub(this).mag();
  }

  /** 두 벡터의 내적 */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /** 두 벡터의 외적 */
  cross(v) {
    let x = this.y * v.z - this.z * v.y;
    let y = this.z * v.x - this.x * v.z;
    let z = this.x * v.y - this.y * v.x;
    return new Vector(x, y, z);
  }

  /** 두 벡터 사이의 각도 */
  angleBetween(v) {
    let dotmagmag = this.dot(v) / (this.mag() * v.mag());
    let angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    angle = angle * Math.sign(this.cross(v).z || 1);
    return angle;
  }

  /** 생성 */
  static create(x = 0, y = 0, z = 0) {
    return new Vector(x, y, z);
  }

  /** 임의의 각도에서 벡터 생성  */
  static random2D() {
    return this.fromAngle(Math.random() * (Math.PI * 2));
  }

  /** 특정 각도에서 백터 생성 */
  static fromAngle(angle, length) {
    if (typeof length === "undefined") {
      length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
  }

  static add(v1 = new Vector(), v2 = new Vector(), target = new Vector()) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.add(v2);

    return target;
  }

  static sub(v1 = undefined, v2 = undefined, target = undefined) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.sub(v2);

    return target;
  }

  static mult(v = undefined, n = undefined, target = undefined) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.mult(n);

    return target;
  }

  static div(v = undefined, n = undefined, target = undefined) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.div(n);

    return target;
  }

  static mag(v = undefined) {
    return v.mag();
  }

  static normalize(v = undefined) {
    return v.normalize();
  }

  static limit(v = undefined) {
    return v.limit();
  }

  static dist(v1 = undefined, v2 = undefined) {
    return v1.dist(v2);
  }

  static dot(v1 = undefined, v2 = undefined) {
    return v1.dot(v2);
  }

  static cross(v1 = undefined, v2 = undefined) {
    return v1.cross(v2);
  }

  static angleBetween(v1 = undefined, v2 = undefined) {
    return v1.angleBetween(v2);
  }
}
