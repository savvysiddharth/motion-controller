let cam;

let targetRed = 255;
let targetGreen = 0;
let targetBlue = 0;

let threshold = 0;

let slider;

const F = 1250; //distance between screen and object
const R = 240; //radius of object (for rotation)

function setup() {
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.size(500, 500);
  cam.hide();
  slider = createSlider(0, 2000, 213, 1);
  stroke(255);
}

let showVideo = true;

function draw() {
  translate(width, 0);
  scale(-1,1);
  threshold = slider.value();
  background(0);
  cam.loadPixels();
  if(showVideo) image(cam, 0, 0);
  stroke(255);
  strokeWeight(2);
  line(0,250, 500,250);
  line(250,0, 250,500);
  detectRGB();
}


function detectRGB() {
  stroke(255);
  let sumx = 0;
  let sumy = 0;
  let count = 0;
  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const dist_to_col = manhattenDist(camred, camgreen, camblue, targetRed, targetGreen, targetBlue);
    if(dist_to_col < threshold) {
      const y = Math.floor(i/500);
      const x = i % 500;
      count++;
      sumx += x;
      sumy += y;
      // if(random() < 0.05)
        // point(x,y);
    }
  }
  let dx = sumx/count;
  let dy = sumy/count;
  fill(0,250,0, 170);
  ellipse(dx, dy, 20,20);

  //approxAim
  dy = map(dy,0,500,250,-250);
  dx = map(dx,0,500,250,-250);
  //approximated with sin
  let deltaY = dy*((F/R) - 1);
  let deltaX = dx*((F/R) - 1);
  // let deltaX =  dx * (  (R+F)/Math.sqrt((R+dx)*(R-dx))  - 1);
  // let deltaY =  dy * (  (R+F)/Math.sqrt((R+dy)*(R-dy))  - 1);
  fill(0,0,250, 170);
  dy = map(dy,250,-250,0,500); //map back
  dx = map(dx,250,-250,0,500); //map back
  const aimX = dx-deltaX;
  const aimY = dy-deltaY;
  stroke(255,255,0);
  strokeWeight(5);
  line(aimX-10, aimY, aimX+10, aimY);
  line(aimX, aimY-10, aimX, aimY+10);

  //resetting stroke to default
  strokeWeight(1);
  stroke(255);

  fill(255);
  // text('deltaX = '+deltaX, 10,20);
  // text('deltaY = '+deltaY, 10,40);
}

function manhattenDist(x1,y1,z1,x2,y2,z2) {
  return Math.abs(x1-x2) + Math.abs(y1-y2) + Math.abs(z1-z2);
}


function changeTargetColor(picker) {
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}

  const hexColor = picker.value;

  targetRed = hexToR(hexColor);
  targetGreen = hexToG(hexColor);
  targetBlue = hexToB(hexColor);

  console.log(targetRed, targetGreen, targetBlue);
}