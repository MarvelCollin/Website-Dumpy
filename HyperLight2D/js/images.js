import * as helper from './helper.js';

const idleRight = helper.getSingleImage('player/idle/idle_right.png');
const idleLeft = helper.getSingleImage('player/idle/idle_left.png');

const moveLeftImages = helper.getImage('player/move/left/move_left', 12);
const moveRightImages = helper.getImage('player/move/right/move_right', 12);

const dashImages = helper.getImage('player/dash/side/dash', 11);
const dashAnimationImages = helper.getImage('player/dash/animation/dash_animation', 4);

export {moveLeftImages, moveRightImages, idleRight, idleLeft, dashImages, dashAnimationImages};