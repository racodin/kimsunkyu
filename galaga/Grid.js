import { ENEMY_SPEED, GAME_WIDTH, ENEMY_POSITION_Y } from "./Constant.js";
import Enemy from "./Enemy.js";

export default class Grid {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: ENEMY_SPEED, y: 0 };
    this.width = 0;
    this.height = 0;
    this.enemies = [];

    this.enemy = {
      width: 38,
      height: 28,
    };
    this.createEnemy();
  }

  createEnemy() {
    const column = Math.floor(Math.random() * 2 + 4);
    const rows = Math.floor(Math.random() * 2 + 2);

    this.width = column * this.enemy.width;
    this.height = rows * this.enemy.height;

    for (let x = 0; x < column; x++) {
      for (let y = 0; y < rows; y++) {
        const enemyPosition = {
          position: {
            x: x * this.enemy.width,
            y: y * this.enemy.height + ENEMY_POSITION_Y,
          },
        };
        this.enemies.push(new Enemy(enemyPosition));
      }
    }
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y = 0;
    if (this.position.x + this.width >= GAME_WIDTH || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = this.enemy.height;
    }
  }
}
