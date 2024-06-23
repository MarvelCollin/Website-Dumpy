import * as img from './images.js';
import {ctx, canvas} from './ctx.js';

let delay = 50;


function drawPlayer(){

}

function animate(){
  drawPlayer();
  setTimeout(function(){
    requestAnimationFrame(animate);
  }, delay);
}

animate();