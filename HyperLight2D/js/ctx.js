const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth + 100;
canvas.height = window.innerHeight + 100;

export {ctx, canvas};