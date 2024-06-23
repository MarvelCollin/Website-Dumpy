import * as img from "./images.js";
import { ctx, canvas } from "./ctx.js";

const boostSpeedFrame = 20;
const normalFrame = 35;
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
const dashSpeed = 5;

let speed = normalSpeed;
let xPlayer = 100;

let clearTimeout = 0;

let currDistance = 0;
let dashDistance = 300;

document.addEventListener("keydown", function () {
  keys[event.key.toLowerCase()] = true;
  if(keys[" "]){
    isDash = true;
  } else {
    if(keys["a"] || keys["d"]) {
      isMoving = true;
    } 
  
    if(keys["control"]){
      isBoost = true;
    }
  }
});

document.addEventListener("keyup", function () {
  keys[event.key.toLowerCase()] = false;

  if(!keys["control"]){
    isBoost = false;
  }
});

document.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function move() {
  if(isBoost){
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

  if(keys["d"] && keys["a"]){
    isMoving = false;
  }

  if (!keys["a"] && !keys["d"]) {
    isMoving = false;
  }
}

function dash(){
  if(currDistance <= dashDistance){
    faced == 0 ? xPlayer -= dashSpeed : xPlayer += dashSpeed;
    currDistance += dashSpeed;
  } else {
    isDash = false;
    speed = normalSpeed;
    currDistance = 0;
  }
}


function clear() {
  if(!isDash){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function drawPlayer() {
  let runImg = new Image();

  if (isMoving) {
    runImg.src = currImgPlayer[currentFramePlayer];
    move();
  } else if(isDash) {
    speed = dashSpeed;
    dash();
  } else {
    runImg.src = idling;
  }
  
  runImg.onload = function () {
    setTimeout(clear(), clearTimeout);
    ctx.drawImage(runImg, xPlayer, 400, 100,100);
    ctx.fill();
  };

  currentFramePlayer = (currentFramePlayer + 1) % currImgPlayer.length;
}

function animate() {
  drawPlayer();
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, delay);
}

animate();
