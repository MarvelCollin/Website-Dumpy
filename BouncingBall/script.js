window.onload = function(){
    const canvas = document.getElementById('box');
    const ctx = canvas.getContext('2d');
    
    
    function getRandom(min, max){
        return Math.random() * (max - min) + min;
    }

    let balls = [];
    let width = height = 40;

    document.addEventListener("mousemove", function(){
        mouseX = event.clientX - canvas.getBoundingClientRect().left;
        mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if(mouseX >= canvas.width){
            mouseX = canvas.width - width / 2;
        }

        if(mouseX <= 0){
            mouseX = width / 2;
        }

        if(mouseY <= 0) {
            mouseY = height / 2;
        }

        if(mouseY >= canvas.height){
            mouseY = canvas.height - height / 2;
        }
    })

    function createBall(){
        let ball = {
            // x: getRandom(width, canvas.width - width),
            // y: getRandom(height, canvas.height - height),
            x: mouseX,
            y: mouseY,
            speedX: 6,
            speedY: 6
        }

        balls.push(ball);
    }



    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'blue';

        balls.forEach(ball => {
            ctx.beginPath();
            ctx.ellipse(ball.x, ball.y, width / 2, height / 2, 0, 0, 360);
            ctx.fill();
    
            ball.x += ball.speedX;
            ball.y += ball.speedY;
    
            if(ball.x + width / 2 > canvas.width || ball.x - width / 2 < 0){
                ball.speedX *= -1;
            } 
    
            if(ball.y + height / 2 > canvas.height || ball.y - height / 2 < 0){
                ball.speedY *= -1;
            }
        })


        requestAnimationFrame(animate);
    }

    document.addEventListener("keypress", function(){
        if(event.key === "x"){
            createBall();
        }
    })


    animate();
}