window.onload = function () {
    const canvas = document.getElementById('box');
    const ctx = canvas.getContext('2d');
    const speedText = document.getElementById('speed');

    let rectX = 50;
    let rectY = 50;
    const rectWidth = 50;
    const rectHeight = 50;
    let speedX = 6;
    let speedY = 6;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'blue';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

        rectX += speedX;
        rectY += speedY;
        if (rectX + rectWidth >= canvas.width || rectX < 0) {
            speedX *= -1;
        } else if(rectY + rectHeight >= canvas.height || rectY < 0) {
            speedY *= -1;
        } 

        requestAnimationFrame(animate);
        speedText.textContent = `${rectSpeed} ${rectX + rectWidth} ${canvas.width}`;
    }

    animate();
};