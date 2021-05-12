ctrack.setDisplaySize(500,500);

let wood,room;

function preload() {
  wood = loadImage("wood.jpeg");
}

function setup() {
  createCanvas(500,500,WEBGL);
}

let angle = 0;

let approxZ;
function draw() {
  background(175);
  noStroke();



  fill(100);
  push();
  rotateX(1.5);
  translate(0, 100,-200);
  plane(410,300);
  pop();

  push();
  approxZ = map(ctrack.count, 1500, 50000, -500, 500);
  translate(ctrack.x - width/2, ctrack.y - height/2, approxZ);
  rotateY(angle);
  rotateX(angle);
  rotateZ(angle);
  texture(wood);
  sphere(20);
  pop();

  angle += 0.02;
}