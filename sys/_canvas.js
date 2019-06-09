
// buffer - image_build_canvas
const buffer = document.createElement('canvas');
buffer.width = 640; // 960  480
buffer.height = 360; // 540 270

const btx = buffer.getContext('2d');
btx.imageSmoothingEnabled = false;

// viewport - drawcanvas
const canvas = document.getElementById('view');
// canvas.width = 480;
canvas.width = 960;
canvas.height = 540;
// canvas.height = 270;

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

clog('_canvas.js');