window.onload = function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.shadowColor = 'black';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -10;
    ctx.shadowOffsetY = 10;

    const img = new Image();
    img.src = "assets/image.png";

    img.onload = function(){
        ctx.drawImage(img, 100, 100, 100, 100);
    }
};
