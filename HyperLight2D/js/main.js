import * as img from "./images.js";
import { ctx, canvas } from "./ctx.js";

const boostSpeedFrame = 20;
const normalFrame = 35;
const dashFrame = 10;
let delay = normalFrame;

let currImgPlayer = [];
let idling = img.idleSrc;
let scale = 1;
currImgPlayer = img.moveLeftSrc;

let currentFramePlayer = 0;

let keys = [];
let isMoving = false;
let isBoost = false;
let isDash = false;

let faced = 0;

// speed config
const normalSpeed = 12;
const boostSpeed = 18;
const dashSpeed = 60;

let speed = normalSpeed;
let xPlayer = 100;

let clearTimeout = 1;

let currDashDistance = 0;
let dashDistance = 200;

let runImg = new Image();

document.addEventListener("keydown", function () {
  keys[event.key.toLowerCase()] = true;
  if (keys[" "]) {
    isDash = true;
  }

  if (keys["a"] || keys["d"]) {
    isMoving = true;
  }

  if (keys["control"]) {
    isBoost = true;
  }
});

document.addEventListener("keyup", function () {
  keys[event.key.toLowerCase()] = false;

  if (!keys["control"]) {
    isBoost = false;
  }
});

document.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function move() {
  if (isBoost) {
    delay = boostSpeedFrame;
    speed = boostSpeed;
  } else {
    speed = normalSpeed;
    delay = normalFrame;
  }

  if (keys["a"]) {
    faced = 0;
    xPlayer -= speed;
    currImgPlayer = img.moveLeftSrc;
  }

  if (keys["d"]) {
    faced = 1;
    xPlayer += speed;
    currImgPlayer = img.moveRightSrc;
  }

  if (!keys["a"] && !keys["d"]) {
    isMoving = false;
  }
}

function dash() {
  if (currDashDistance <= dashDistance) {
    console.log('counting');
    if (faced == 0) {
      xPlayer -= dashSpeed;
    } else if (faced == 1) {
      xPlayer += dashSpeed;
    }
    delay = dashFrame;
    currDashDistance += dashSpeed;
  } else {
    delay = normalFrame;
    isDash = false;
    speed = normalSpeed;
    currDashDistance = 0;
  }
}

function draw(currImg){
  let runImg = new Image();

  runImg.src = currImg;

  runImg.onload = function () {
    if (!isDash) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(runImg, xPlayer, 400, 100, 100);
    ctx.fill();
  };
}

function drawPlayer() {
  let currSrc = idling;

  if (isDash) {
    dash();
  } else if (isMoving) {
    currSrc = currImgPlayer[currentFramePlayer];
    move();
  } else {
    currSrc = idling;
  }

  draw(currSrc);

  currentFramePlayer = (currentFramePlayer + 1) % currImgPlayer.length;
}

function animate() {
  drawPlayer();
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, delay);
}

animate();
