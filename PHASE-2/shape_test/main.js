let cam;

let targetRed = 252;
let targetGreen = 0;
let targetBlue = 0;

let threshold = 0;
let t2 = 0;
let t3 = 0;

let slider;

let modelCall;

class Blob {
  constructor(x,y,width,height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

let blobs = [];

function setup() {
  // modelCall = tf.loadLayersModel('./model.json');
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.size(500, 500);
  cam.hide();
  slider = createSlider(0, 2000, 120, 1);
  stroke(255);
}

let showVideo = true;

let record = false;
function draw() {
  // modelCall.then((model)=>{
    threshold = slider.value();
    background(0);
    cam.loadPixels();
    if(showVideo) image(cam, 0, 0);
    detectRGB();
    if(record) save('test');
  // });
}


function detectRGB() {
  stroke(255);
  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const dist_to_col = manhattenDist(camred, camgreen, camblue, targetRed, targetGreen, targetBlue);
    if(dist_to_col < threshold) {
      const x = Math.floor(i/500);
      const y = i % 500;
      // if(random() < 0.05)
        point(y,x);
    }
  }
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