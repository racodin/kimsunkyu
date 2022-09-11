import Vector from "../common/Vector.js";

export default class Ball {
  constructor({ x = 0, y = 0, radius = 10, color = "#fff" } = {}) {
    this.position = new Vector(x, y);
    this.velocity = Vector.random2D();
    this.velocity.mult(3);
    this.radius = radius;
    this.color = color;
    this.mass = radius * 0.1;
  }

  update() {
    this.position.add(this.velocity);
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  boundaryCollision({ width = 500, height = 300 }) {
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    } else if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }
  }

  collision(other) {
    // 볼 사이의 거리
    let distanceVect = Vector.sub(other.position, this.position);

    // 볼 벡터 크기
    let distanceVectMag = distanceVect.mag();

    // 볼의 반지름 합
    let minDistance = this.radius + other.radius;

    if (distanceVectMag < minDistance) {
      let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
      let d = distanceVect.copy();
      let correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      this.position.sub(correctionVector);

      // 볼 사이의 각
      let theta = distanceVect.heading();
      // 삼각함수
      let sine = Math.sin(theta);
      let cosine = Math.cos(theta);

      // 볼의 임시 위치
      let bTemp = [new Vector(), new Vector()];

      bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

      // 볼의 회전 임시 속도
      let vTemp = [new Vector(), new Vector()];
      vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
      vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
      vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

      // 속도가 회전, 운동량 보전 방정식 사용, x축을 따라 최종 속도를 계산
      let vFinal = [new Vector(), new Vector()];
      vFinal[0].x =
        ((this.mass - other.mass) * vTemp[0].x + 2 * other.mass * vTemp[1].x) /
        (this.mass + other.mass);
      vFinal[0].y = vTemp[0].y;
      vFinal[1].x =
        ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) /
        (this.mass + other.mass);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      let bFinal = [new Vector(), new Vector()];
      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      // 볼의 위치 적용
      other.position.x = this.position.x + bFinal[1].x;
      other.position.y = this.position.y + bFinal[1].y;
      this.position.add(bFinal[0]);

      // 볼의 속도 적용
      this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
}
