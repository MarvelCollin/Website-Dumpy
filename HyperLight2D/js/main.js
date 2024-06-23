import * as img from "./images.js";
import { ctx, canvas } from "./ctx.js";

let delay = 20;
let currImgPlayer = [];
let idling = img.idleSrc;
let scale = 1;
currImgPlayer = img.moveLeftSrc;

let currentFramePlayer = 0;

let keys = [];
let isMoving = false;
let speed = 6;
let xPlayer = 100;

document.addEventListener("keydown", function () {
  keys[event.key.toLowerCase()] = true;
  isMoving = true;
});

document.addEventListener("keyup", function () {
  keys[event.key.toLowerCase()] = false;
});

document.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function move() {
  if (keys["a"]) {
    xPlayer -= speed;
    currImgPlayer = img.moveLeftSrc;
  }

  if (keys["d"]) {
    xPlayer += speed;
    currImgPlayer = img.moveRightSrc;
  }

  if (!keys["a"] && !keys["d"]) {
    isMoving = false;
  }
}


function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  let runImg = new Image();

  if (isMoving) {
    runImg.src = currImgPlayer[currentFramePlayer];
  } else {
    runImg.src = idling;
  }

  runImg.onload = function () {
    ctx.drawImage(runImg, xPlayer, 400, 100,100);
    ctx.fill();
  };

  currentFramePlayer = (currentFramePlayer + 1) % currImgPlayer.length;
}

function animate() {
  drawPlayer();
  // setTimeout(function () {
  //   requestAnimationFrame(animate);
  // }, delay);
}

animate();
