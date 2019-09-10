let cam;

function setup() {
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.size(500, 500);
  cam.hide();
  console.log(cam.width);
  console.log(cam.height);
  // noLoop();
}

function draw() {
  background(0);
  stroke(255);
  cam.loadPixels();

  // console.log(cam.pixels);

  image(cam, 0, 0);

  for(let i=0; i<500*500; i++) {
    const camred = cam.pixels[i*4];
    const camgreen = cam.pixels[i*4 + 1];
    const camblue = cam.pixels[i*4 + 2];

    const dist_to_col = dist(camred, camgreen, camblue, 252, 255, 0);
    // console.log(dist_to_col);
    if(dist_to_col < 150) {
      stroke(random(0,255));
      const x = Math.floor(i/500);
      const y = i % 500;
      // console.log(x,y)
      point(y,x);
    }
  }
}

function mousePressed() {
  draw();
}