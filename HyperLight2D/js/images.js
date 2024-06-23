import * as helper from './helper.js';

const idleSrc = '../assets/player/idle/idle_down.png';

const moveLeftSrc = helper.getSrc('player/move/left/move_left', 12);
const moveRightSrc = helper.getSrc('player/move/right/move_right', 12);

const dashSrc = helper.getSrc('player/dash/side/dash', 11);
const dashAnimationSrc = helper.getSrc('player/dash/animation/dash_animation', 4);

export {moveLeftSrc, moveRightSrc, idleSrc , dashSrc, dashAnimationSrc};