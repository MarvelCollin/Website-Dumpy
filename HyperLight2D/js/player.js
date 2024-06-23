import { ctx, canvas } from "./ctx.js";
import * as img from "./images.js";

let xPlayer = 100;
let speed = 10;

let currImg = [];
let keys = {};
let isWalking = false;
let isIdle = true;

let currentFrame = 0;
let currentFrameShadow = 0;
let delay = 20;
let constDelay = 20;
let idleFaced = img.idleRight;
let sizeFloor = 270;

let distanceDash = 200;
let frameDash = 3;
let isDash = false;
let startDash = 0;
let canDash = true;

let dashCooldown = 3000;
let lastDash = 0;

let isJumping = false;
let distanceJump = 100;

currImg = img.moveLeftImages;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth + 100;
  canvas.height = window.innerHeight + 100;
});

document.addEventListener("keydown", function (event) {
  isIdle = false;
  let key = event.key.toLowerCase();
  keys[key] = true;

  if (canDash && !isDash) {asds
    if (keys[" "]) {
      isWalking = false;
      canDash = false;
      isDash = true;
      setTimeout(function () {
        canDash = true;
      }, dashCooldown);
    }
  } else if (keys["a"] || keys["d"]) {
    isWalking = true;
  } else if(keys["w"]){

  }
});


document.addEventListener("keyup", function () {
  keys[event.key] = false;
  isDash = false;
  isWalking = false;
  isIdle = true;
});

function checkCollision() {
  if (xPlayer <= 0) {
    xPlayer = 1;
  } else if (xPlayer >= canvas.width - 100) {
    xPlayer = canvas.width - 101;
  }
}

function dash() {
  if (startDash < distanceDash) {
    currImg = img.dashImages;
    startDash += speed * 2;
    xPlayer += idleFaced === img.idleLeft ? -speed * 2 : speed * 2;
    delay = frameDash;
  } else {
    startDash = 0;
    isDash = false;
    delay = constDelay;
  }
}

function move() {
  if (keys["d"]) {
    xPlayer += speed;
    currImg = img.moveRightImages;
    idleFaced = img.idleRight;
  }

  if (keys["a"]) {
    xPlayer -= speed;
    currImg = img.moveLeftImages;
    idleFaced = img.idleLeft;
  }

  checkCollision();
}

function draw() {
  let curr = new Image();

  if (!isDash) {
    ctx.clearRect(0, 0, canvas.width, canvas.height + 200);
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(0, canvas.height - sizeFloor, canvas.width, canvas.height);

  if (!isIdle) {
    curr = currImg[currentFrame];
  }

  if (isWalking) {
    move();
  } else if (isDash) {
    let shadow = new Image();

    let shadows = [];
    shadows = img.dashAnimationImages;
    shadows.forEach((shadow) => {
      ctx.drawImage(
        shadow,
        xPlayer - 30,
        canvas.height - sizeFloor - 93,
        100,
        100
      );
    });

    dash();
  } else {
    curr = idleFaced;
  }

  if (!isDash) {
    ctx.drawImage(
      curr,
      xPlayer - curr.width / 2,
      canvas.height - sizeFloor - 93,
      100,
      100
    );
    ctx.fill();
  }

  if (isWalking) currentFrame = (currentFrame + 1) % currImg.length;
}

export function run() {
  draw();
  setTimeout(function () {
    requestAnimationFrame(run);
  }, delay);
}
