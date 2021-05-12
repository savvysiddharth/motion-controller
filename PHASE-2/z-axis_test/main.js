let cam;

let targetRed = 252;
let targetGreen = 0;
let targetBlue = 0;

function setup() {
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.size(500, 500);
  cam.hide();
  console.log(cam.width);
  console.log(cam.height);
  // noLoop();
}

let minCount = Infinity;
let maxCount = 0;
let countSum = 0;

function draw() {
  background(0);
  stroke(255);
  cam.loadPixels();
  // translate(width, 0);
  // scale(-1,1);

  image(cam, 0, 0);
  let count = 0;

  const threshold = 212;

  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const dist_to_col = manhattenDist(camred, camgreen, camblue, targetRed, targetGreen, targetBlue);
    if(dist_to_col < threshold) {
      const y = Math.floor(i/500);
      const x = i % 500;
      point(x,y);
      count++;
    }
  }

  if(count < minCount) minCount = count;
  if(count > maxCount) maxCount = count;
  countSum += count;

  if(frameCount%100 == 0) {
    console.log('max: '+maxCount);
    console.log('min: '+minCount);
    console.log('avg: '+countSum/frameCount);
    maxCount = 0;
    minCount = Infinity;
    frameCount = 0;
    countSum = 0;
  }

  noStroke();
  fill(255);
  text('count: '+count, 50,50);
  // let ball_diameter = map(count,1000,33000,10,300);
  // ellipse(250,250, ball_diameter, ball_diameter);
}

function setTargetColorRGB(r,g,b) {
  targetRed = r;
  targetGreen = g;
  targetBlue = b;
}

function mousePressed() {
  draw();
  console.log('mouse pressed!');
  let c = get(mouseX, mouseY);
  console.log(c);
  setTargetColorRGB(c[0],c[1],c[2]);
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