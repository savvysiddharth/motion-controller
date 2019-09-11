let cam;

let targetRed = 252;
let targetGreen = 255;
let targetBlue = 0;

let threshold = 120;

let slider;

function setup() {
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.size(500, 500);
  cam.hide();
  slider = createSlider(0, 2000, 120, 1);
  // noLoop();
}

function draw() {
  threshold = slider.value();
  background(0);
  stroke(255);
  cam.loadPixels();

  // console.log(cam.pixels);

  image(cam, 0, 0);
  stroke(255);

  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const dist_to_col = manhattenDist(camred, camgreen, camblue, targetRed, targetGreen, targetBlue);
    // console.log(dist_to_col);
    if(dist_to_col < threshold) {
      const x = Math.floor(i/500);
      const y = i % 500;
      // console.log(x,y)
      if(random() < 0.2)
        point(y,x);
    }
  }
}

function mousePressed() {
  draw();
}

function easyDist(x1,y1,z1,x2,y2,z2) {
  return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2);
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