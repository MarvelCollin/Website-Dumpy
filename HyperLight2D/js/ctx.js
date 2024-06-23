const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


document.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

export {ctx, canvas};