let cam;

let targetRed = 252;
let targetGreen = 0;
let targetBlue = 0;

let threshold = 178;
let slider;

function setup() {
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.size(500, 500);
  // cam.hide();
  // slider = createSlider(0, 2000, 212, 1);
  noStroke();
  background(0,0,0,120);
}

function draw() {
  // threshold = slider.value();
  cam.loadPixels();
  // image(cam, 0, 0);
  translate(width,0); // move to far corner
  scale(-1.0,1.0);
  paintIt();
}

function paintIt() {
  let sumx = 0, sumy = 0, count = 0;
  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const dist_to_col = manhattenDist(camred, camgreen, camblue, targetRed, targetGreen, targetBlue);
    if(dist_to_col < threshold) {
      const y = Math.floor(i/500);
      const x = i % 500;
      sumx += x;
      sumy += y;
      count++;
    }
  }
  let meanX = sumx/count;
  let meanY = sumy/count;
  // stroke(255,255,0);
  // strokeWeight(5);
  fill(25, 112, 212);
  ellipse(meanX, meanY, 20, 20);
  // line(meanX, meanY-10, meanX, meanY+10);
  // line(meanX-10, meanY, meanX+10, meanY);
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

function clearDoodles() {
  clear();
  background(0,0,0,120);
}

function pauseApp() {
  noLoop();
  document.querySelector('video').pause();
}