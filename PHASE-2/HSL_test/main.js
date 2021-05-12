let cam;

let targetRed = 255;
let targetGreen = 0;
let targetBlue = 0;

let threshold = 0;
let t2 = 0;
let t3 = 0;

let slider;

let REF_IMAGE = Array(500*500).fill(0); //stores fixed background image

let REF_IMAGE_HSV = Array(500*500).fill(0);

function setup() {
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.size(500, 500);
  cam.hide();
  slider = createSlider(0, 2000, 230, 1);
  // slider2 = createSlider(0, 300, 0, 1);
  // slider3 = createSlider(0, 300, 0, 1);
  stroke(255);
  // noLoop();
}

let showVideo = true;

let record = false;

let fps_sum = 0;

function draw() {
  threshold = slider.value();
  background(0);

  // translate(width,0);
  // scale(-1,1);

  cam.loadPixels();
  if(showVideo) image(cam, 0, 0);
  // detectHSV_GREEN();
  detectRGB()
  // detectRGB();

  noStroke();
  textSize(16);
  fill(255);
  // text('FPS: '+frameRate().toFixed(2), 10, 20);

  // fps_sum += frameRate();
  // if(frameCount % 200 == 0) {
  //   console.log('avgFps: '+fps_sum/frameCount);
  // }
}

function detectHSV_RED() {
  stroke(255);

  for(let i=0; i<500*500; i++) {
    const camRed = cam.pixels[i*4];
    const camGreen = cam.pixels[i*4 + 1];
    const camBlue = cam.pixels[i*4 + 2];

    const pixel = RGBtoHSV(camRed, camGreen, camBlue);

    const isValidHue = (0 <= pixel.h) && (pixel.h <= 3) || (357 <= pixel.h) && (pixel.h <= 360);
    const isValidSat = pixel.s > 40;
    const isValidVal = pixel.v > 50;

    const isValidColor = isValidHue && isValidSat && isValidVal;

    if(isValidColor) {
      const x = Math.floor(i/500);
      const y = i % 500;
      // if(random() < 0.1)
        point(y,x);
    }
  }
}

function detectHSV_YELLOW() {
  stroke(255);

  for(let i=0; i<500*500; i++) {
    const camRed = cam.pixels[i*4];
    const camGreen = cam.pixels[i*4 + 1];
    const camBlue = cam.pixels[i*4 + 2];

    const pixel = RGBtoHSV(camRed, camGreen, camBlue);

    const isValidHue = (40 <= pixel.h) && (pixel.h <= 75);
    const isValidSat = pixel.s > 10;
    const isValidVal = pixel.v > 10;

    const isValidColor = isValidHue && isValidSat && isValidVal;

    if(isValidColor) {
      const x = Math.floor(i/500);
      const y = i % 500;
      // if(random() < 0.1)
        point(y,x);
    }
  }
}

function detectHSV_GREEN() {
  stroke(255);

  // let sumx = 0, sumy = 0, count = 0;

  for(let i=0; i<500*500; i++) {
    const camRed = cam.pixels[i*4];
    const camGreen = cam.pixels[i*4 + 1];
    const camBlue = cam.pixels[i*4 + 2];

    const pixel = RGBtoHSV(camRed, camGreen, camBlue);

    const isValidHue = (70 <= pixel.h) && (pixel.h <= 180);
    const isValidSat = (40 <= pixel.s) && (pixel.s <= 100);
    const isValidVal = (25 <= pixel.v) && (pixel.v <= 60);

    const isValidColor = isValidHue && isValidSat && isValidVal;

    if(isValidColor) {
      const x = Math.floor(i/500);
      const y = i % 500;
      // sumx += x;
      // sumy += y;
      // count++;
      // if(random() < 0.1)
        point(y,x);
    }
  }

  // fill(0,255,0,1);
  // ellipse(sumx/count, sumy/count, 20, 20);
}

function mousePressed() {
  let pix = get(mouseX, mouseY);
  console.log(pix);
}

function backgroundDetect_RGB() {
  for(let i=0; i<500*500; i++) {
    const camRed = cam.pixels[i*4];
    const camGreen = cam.pixels[i*4 + 1];
    const camBlue = cam.pixels[i*4 + 2];

    const refRed = REF_IMAGE[i*4];
    const refGreen = REF_IMAGE[i*4 + 1];
    const refBlue = REF_IMAGE[i*4 + 2];

    const dist_to_ref = manhattenDist(camRed, camGreen, camBlue, refRed, refGreen, refBlue);
    if(dist_to_ref > threshold) { //first slider
      const x = Math.floor(i/500);
      const y = i % 500;
      // if(random() < 0.1)
        point(y,x);
    }
  }
}

function backgroundDetect_HSV() {
  for(let i=0; i<500*500; i++) {
    const camRed = cam.pixels[i*4];
    const camGreen = cam.pixels[i*4 + 1];
    const camBlue = cam.pixels[i*4 + 2];

    const pixelHSV = RGBtoHSV(camRed, camGreen, camBlue);

    const refHue = REF_IMAGE_HSV[i*4];
    const refSaturation = REF_IMAGE_HSV[i*4 + 1];
    const refValue = REF_IMAGE_HSV[i*4 + 2];

    if(pixelHSV.h > refHue - threshold && pixelHSV.h < refHue + threshold) { //hue check
      if(pixelHSV.s > refSaturation - t2 && pixelHSV.s < refSaturation + t2) { //saturation check
        if(pixelHSV.v > refValue - t3 && pixelHSV.v < refValue + t3) { //value check
          const x = Math.floor(i/500);
          const y = i % 500;
          if(random() < 0.1)
            point(y,x);
        }
      }
    }

  }
}

function detectRGB() {
  stroke(255);
  // let sumx = 0, sumy = 0, count = 0;
  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const dist_to_col = manhattenDist(camred, camgreen, camblue, targetRed, targetGreen, targetBlue);
    if(dist_to_col < threshold) {
      const x = Math.floor(i/500);
      const y = i % 500;
      // sumx += x;
      // sumy += y;
      // count++;
      // if(random() < 0.05)
        point(y,x);
    }
  }
  // fill(0,255,0,1);
  // ellipse(sumx/count, sumy/count, 20, 20);
}

function detectRGB_Threshold() {
  stroke(255);
  // let sumx = 0, sumy = 0, count = 0;
  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const isValidRed = (105 <= camred) && (camred <= 255);
    const isValidGreen = (0 <= camgreen) && (camgreen <= 90);
    const isValidBlue = (0 <= camblue) && (camblue <= 90);

    const isValidColor = isValidRed && isValidGreen && isValidBlue;

    if(isValidColor) {
      const x = Math.floor(i/500);
      const y = i % 500;
      // sumx += x;
      // sumy += y;
      // count++;
      // if(random() < 0.1)
        point(y,x);
    }
  }
  // fill(0,255,0,1);
  // ellipse(sumx/count, sumy/count, 20, 20);
}

function detectHSV() {
  stroke(255,50,50);
  const targetHSV = RGBtoHSV(targetRed, targetGreen, targetBlue);

  for(let i=0; i<500*500; i++) {
    const camRed = cam.pixels[i*4];
    const camGreen = cam.pixels[i*4 + 1];
    const camBlue = cam.pixels[i*4 + 2];

    const pixelHSV = RGBtoHSV(camRed, camGreen, camBlue);

    if(pixelHSV.h > targetHSV.h - t2 && pixelHSV.h < targetHSV.h + t2) { //hue check
      if(pixelHSV.s > targetHSV.s - t2/2 && pixelHSV.s < targetHSV.s + t2/2) { //saturation check
        if(pixelHSV.v > targetHSV.v - t2/2 && pixelHSV.v < targetHSV.v + t2/2) { //value check
          const x = Math.floor(i/500);
          const y = i % 500;
          if(random() < 0.1)
            point(y,x);
        }
      }
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

function setReference() {
  cam.loadPixels();
  console.log(cam.pixels);
  REF_IMAGE = cam.pixels.slice();

  //building image on HSV model
  for(let i=0; i<500*500; i++) {
    const r = REF_IMAGE[i*4];
    const g = REF_IMAGE[i*4 + 1];
    const b = REF_IMAGE[i*4 + 2];
    const hsv = RGBtoHSV(r,g,b);
    REF_IMAGE_HSV[i*4] = hsv.h;
    REF_IMAGE_HSV[i*4 + 1] = hsv.s;
    REF_IMAGE_HSV[i*4 + 2] = hsv.v;
  }
}

function RGBtoHSV(r, g, b) {
  const R = r/255;
  const G = g/255;
  const B = b/255;

  const maxRGB = Math.max(R, G, B);
  const minRGB = Math.min(R, G, B);

  let targetH, targetS, targetV;
  if(maxRGB == R) {
    targetH = 60 * ((G - B)/(maxRGB - minRGB));
  } else if(maxRGB == G) {
    targetH = 60 * ((B - R)/(maxRGB - minRGB)) + 120;
  } else if(maxRGB == B) {
    targetH = 60 * ((R - G)/(maxRGB - minRGB)) + 240;
  }
  targetS = ((maxRGB - minRGB) / maxRGB ) * 100;
  targetV = maxRGB*100;

  let hsv = {};
  hsv.h = targetH;
  hsv.s = targetS;
  hsv.v = targetV;

  return hsv;

}

function recorderSwitch() {
  record = !record;
  if(record) console.log('recording...');
  else console.log('recording stopped...');
}