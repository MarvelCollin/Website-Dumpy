import * as img from "./images.js";
import { ctx, canvas } from "./ctx.js";

const boostSpeedFrame = 20;
const normalFrame = 35;
const dashFrame = 1;
let delay = normalFrame;

let currImgPlayer = [];
let idling = img.idleSrc;
let scale = 3;
currImgPlayer = img.moveLeftSrc;

let currentFramePlayer = 0;

let keys = [];
let isMoving = false;
let isBoost = false;
let isDash = false;
let isAttack = false;

let faced = 0;

const normalSpeed = 12;
const boostSpeed = 18;
const dashSpeed = 30;

let speed = normalSpeed;
let xPlayer = 100;

let angle = 0;
let xTranslate = 0;
let yTranslate = 0;


let clearTimeout = 1;

let currDashDistance = 0;
let dashDistance = 300;

let runImg = new Image();

document.addEventListener("mousedown", function () {
  if (event.button == 0) {
    isAttack = true;
    if(faced == 0){
      angle = 80;
    } else if(faced == 1){
      angle = -80;
    }
    xTranslate = -60;
    yTranslate = -30;


    attack();
  }
});



document.addEventListener("keydown", function () {
  keys[event.key.toLowerCase()] = true;
  if (keys[" "]) {
    clear();
    isDash = true;
  } else {
    if (keys["a"] || keys["d"]) {
      isMoving = true;
    }

    if (keys["control"]) {
      isBoost = true;
    }
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

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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

function attack() {
  currImgPlayer = img.attackingSrc;
    
  if(currentFramePlayer >= img.attackingSrc.length - 1){
    clear();
    isAttack = false;
    angle = 0;
    xTranslate = 0;
    yTranslate = 0;
  }
}

function draw(currImg) {
  let runImg = new Image();

  runImg.src = currImg;

  runImg.onload = function () {
    ctx.save();
    if (!isDash) {
      clear();
    }

    let width = runImg.width * scale;
    let height = runImg.height * scale;
    ctx.save();
    ctx.translate(xPlayer + xTranslate + width / 2, 600 + yTranslate + height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(runImg, -width / 2, -height / 2, width, height);
    // ctx.drawImage(runImg, xPlayer, 400, runImg.width * scale, runImg.height * scale);
    ctx.fill();
    ctx.restore();
  };
}

function drawPlayer() {
  let currSrc = idling;
  
  if (isAttack) {
    console.log('attack');
    attack();
    currSrc = currImgPlayer[currentFramePlayer];
  } else if (isDash) {
    currImgPlayer = img.dashAnimationSrc;
    currSrc = currImgPlayer[currentFramePlayer];
    dash();
  } else if (isMoving) {
    currSrc = currImgPlayer[currentFramePlayer];
    move();
  } else {
    currSrc = idling;
  }


  currentFramePlayer = (currentFramePlayer + 1) % currImgPlayer.length;
  draw(currSrc);
}

function checkCollision() {
  if (xPlayer < 0) {
    xPlayer = 0;
  } else if (xPlayer >= canvas.width) {
    xPlayer = canvas.width - 80;
  }
}

function animate() {
  drawPlayer();
  checkCollision();
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, delay);
}

animate();
