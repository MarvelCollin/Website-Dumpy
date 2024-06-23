const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const idleFrameCount = 10;
const runFrameCount = 8;
let currentFrame = 0;
const frameInterval = 30; 
let lastFrameTime = 0;
const widthPlayer = 100;
const heightPlayer = 100;
let x = canvas.width / 2 - widthPlayer / 2;
let y = canvas.height / 2 - heightPlayer / 2;
const speed = 3;
let isRunning = false;
let isFacingRight = true;
const idleImages = [];
const runImages = [];

for (let i = 1; i <= idleFrameCount; i++) {
    const img = new Image();
    img.src = `assets/idle/idle (${i}).png`;
    idleImages.push(img);
}

for (let i = 1; i <= runFrameCount; i++) {
    const img = new Image();
    img.src = `assets/run/Run (${i}).png`;
    runImages.push(img);
}

const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    q: false
};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

function dash(isFacingRight){
    setTimeout(() => {
        if(isFacingRight){
            x += speed * 8; 
        } else {
            x -= speed * 8; 
        }
    }, 1000);
}

function updatePosition() {
    isRunning = false;

    if (keys.w) {
        y -= speed;
        isRunning = true;
    }
    if (keys.s) {
        y += speed;
        isRunning = true;x
    }
    if (keys.a) {
        x -= speed;
        isRunning = true;
        isFacingRight = false;
    }
    if (keys.d) {
        x += speed;
        isRunning = true;
        isFacingRight = true;
    }
    // if(keys.q){
    //     dash(isFacingRight);
    // }

    x = Math.max(0, Math.min(canvas.width - widthPlayer, x));
    y = Math.max(0, Math.min(canvas.height - heightPlayer, y));
}

function drawFrame(timestamp) {
    if (!lastFrameTime) {
        lastFrameTime = timestamp;
    }

    const elapsed = timestamp - lastFrameTime;

    if (elapsed >= frameInterval) {
        const images = isRunning ? runImages : idleImages;
        const img = images[currentFrame];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isFacingRight) {
            ctx.drawImage(img, x, y, widthPlayer, heightPlayer);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(img, -x - widthPlayer, y, widthPlayer, heightPlayer);
            ctx.restore();
        }

        currentFrame = (currentFrame + 1) % images.length;
        lastFrameTime = timestamp;
    }

    requestAnimationFrame(drawFrame);
}

function animate() {
    updatePosition();
    requestAnimationFrame(animate);
}

function startAnimation() {
    requestAnimationFrame(drawFrame);
    requestAnimationFrame(animate);
}

idleImages[idleFrameCount - 1].onload = () => {
    runImages[runFrameCount - 1].onload = () => {
        startAnimation();
    };
};