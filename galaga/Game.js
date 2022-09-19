import Utils from "./helpers/Utils.js";
import Color from "./helpers/Color.js";

import {
  GAME_WIDTH,
  GAME_HEIGHT,
  SHIP_SPEED,
  READY_DELAY,
  GAMEOVER_DELAY,
} from "./Constant.js";
import Grid from "./Grid.js";
import Particle from "./Particle.js";
import Missile from "./Missile.js";
import Player from "./Player.js";

const scoreEl = document.querySelector(".score");
const playEl = document.querySelector(".play");
const guideEl = document.querySelector(".guide");
const readytEl = document.querySelector(".ready");
const gameoverEl = document.querySelector(".gameover");
const restartEl = document.querySelector(".restart");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const element = {
  show(el) {
    el.style.display = "block";
  },
  hide(el) {
    el.style.display = "";
  },
};

const player = new Player();
let playerMissiles = [];
let grids = [];
let enemyMissiles = [];
let spaces = [];
let explosions = [];

const KEYS = {
  A: {
    pressed: false,
  },
  D: {
    pressed: false,
  },
  SPACE: {
    pressed: false,
  },
};

let game = {
  play: false,
  over: false,
  stage: 1,
  score: 0,
  frames: 0,
};

function createParticle({ target, color, fade }) {
  for (let i = 0; i < 35; i++) {
    explosions.push(
      new Particle({
        position: {
          x: target.position.x + target.width / 2,
          y: target.position.y + target.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
        },
        radius: Math.random() * 2 + 1,
        opacity: 1,
        color: color,
        fade,
      })
    );
  }
}

function animate() {
  background();
  pressKey();

  if (game.play) {
    enemy();
    ship();
  }
  game.frames++;

  requestAnimationFrame(animate);
}

function background() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  spaces.forEach((particle, particleIndex) => {
    if (particle.position.y - particle.radius >= GAME_HEIGHT) {
      particle.position.x = Math.random() * GAME_WIDTH;
      particle.position.y = -particle.radius;
    }

    if (particle.opacity <= 0) {
      spaces.splice(particleIndex, 1);
    } else {
      particle.draw(ctx);
      particle.update();
    }
  });
}

function pressKey() {
  if (KEYS.A.pressed && player.position.x >= SHIP_SPEED) {
    player.velocity.x = -SHIP_SPEED;
  } else if (
    KEYS.D.pressed &&
    player.position.x + player.width + SHIP_SPEED <= GAME_WIDTH
  ) {
    player.velocity.x = SHIP_SPEED;
  } else {
    player.velocity.x = 0;
  }
}

function enemy() {
  explosions.forEach((particle, particleIndex) => {
    if (particle.opacity <= 0) {
      explosions.splice(particleIndex, 1);
    } else {
      particle.draw(ctx);
      particle.update();
    }
  });

  enemyMissiles.forEach((enemyMissile, enemyMissileIndex) => {
    if (enemyMissile.position.y + enemyMissile.height >= GAME_HEIGHT) {
      enemyMissiles.splice(enemyMissileIndex, 1);
    } else {
      enemyMissile.draw(ctx);
      enemyMissile.update();
    }

    if (
      enemyMissile.position.y + enemyMissile.height >= player.position.y &&
      enemyMissile.position.x + enemyMissile.width >= player.position.x &&
      enemyMissile.position.x <= player.position.x + player.width &&
      !game.over
    ) {
      game.over = true;
      player.opacity = 0;
      enemyMissiles.splice(enemyMissileIndex, 1);

      setTimeout(() => {
        gameover();
      }, GAMEOVER_DELAY);

      createParticle({
        target: player,
        color: "white",
        fade: true,
      });
    }
  });

  grids.forEach((grid, gridIndex) => {
    grid.update();

    if (game.frames % 30 === 0 && grid.enemies.length > 0) {
      grid.enemies[Math.floor(Math.random() * grid.enemies.length)].shoot(
        enemyMissiles
      );
    }

    grid.enemies.forEach((enemy, enemyIndex) => {
      enemy.draw(ctx);
      enemy.update({ velocity: grid.velocity });

      playerMissiles.forEach((missile, missileIndex) => {
        if (
          missile.position.y - missile.height <=
            enemy.position.y + enemy.height &&
          missile.position.y + missile.height >= enemy.position.y &&
          missile.position.x - missile.height <=
            enemy.position.x + enemy.width &&
          missile.position.x + missile.height >= enemy.position.x
        ) {
          const enemyFound = grid.enemies.find((enemy2) => enemy2 === enemy);
          const missileFound = playerMissiles.find(
            (missile2) => missile2 === missile
          );

          if (enemyFound && missileFound) {
            game.score += 50;
            score(game.score);

            createParticle({
              target: enemy,
              color: "white",
              fade: true,
            });

            grid.enemies.splice(enemyIndex, 1);
            playerMissiles.splice(missileIndex, 1);

            if (grid.enemies.length > 0) {
              const firstEnemy = grid.enemies[0];
              const lastEnemy = grid.enemies[grid.enemies.length - 1];

              grid.width =
                lastEnemy.position.x - firstEnemy.position.x + lastEnemy.width;
              grid.position.x = firstEnemy.position.x;
            } else {
              grids.splice(gridIndex, 1);
            }
          }
        }
      });
    });
  });

  if (!grids.length) {
    grids.push(new Grid());
  }
}

function ship() {
  player.draw(ctx);
  player.update();
  playerMissiles.forEach((missile, missileIndex) => {
    if (missile.position.y + missile.height <= 0) {
      playerMissiles.splice(missileIndex, 1);
    } else {
      missile.draw(ctx);
      missile.update();
    }
  });
}

function addBgParticle() {
  for (let i = 0; i < 100; i++) {
    const options = {
      position: {
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
      },
      velocity: {
        x: 0,
        y: Math.random() * 1 + 1,
      },
      radius: Math.random() * 2 + 1,
      color: Color.random(),
      opacity: 0.5,
    };
    spaces.push(new Particle(options));
  }
}

function addEvent() {
  addEventListener("keydown", ({ key }) => {
    if (game.over) return;
    switch (key) {
      case "a":
        KEYS.A.pressed = true;
        break;
      case "ArrowLeft":
        KEYS.A.pressed = true;
        break;
      case "d":
        KEYS.D.pressed = true;
        break;
      case "ArrowRight":
        KEYS.D.pressed = true;
        break;
    }
  });

  addEventListener(
    "keydown",
    Utils.throttle(({ key }) => {
      switch (key) {
        case " ":
          // if (!game.play || game.over) return ready();
          if (game.over) return;
          KEYS.SPACE.pressed = true;
          playerMissiles.push(
            new Missile({
              position: {
                x: player.position.x + player.width / 2,
                y: player.position.y,
              },
              velocity: {
                x: 0,
                y: -10,
              },
              color: "yellow",
            })
          );
          break;
      }
    }, 300)
  );

  addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "a":
        KEYS.A.pressed = false;
        break;
      case "ArrowLeft":
        KEYS.A.pressed = false;
        break;
      case "d":
        KEYS.D.pressed = false;
        break;
      case "ArrowRight":
        KEYS.D.pressed = false;
        break;
      case " ":
        KEYS.SPACE.pressed = false;
        break;
    }
  });

  playEl.addEventListener("click", ready);
  restartEl.addEventListener("click", ready);
}

function score(num) {
  scoreEl.innerHTML = num;
}

function reset() {
  score(0);
  game.play = false;
  game.over = false;
  player.reset();
  grids = [];
  enemyMissiles = [];
}

function ready() {
  element.hide(gameoverEl);
  element.hide(restartEl);
  element.hide(playEl);
  element.hide(guideEl);
  element.show(readytEl);
  reset();
  setTimeout(play, READY_DELAY);
}

function play() {
  element.hide(readytEl);
  game.play = true;
}

function gameover() {
  element.show(gameoverEl);
  element.show(restartEl);
}

function init() {
  element.show(playEl);
  element.show(guideEl);
  addBgParticle();
  addEvent();
  animate();
}

init();
