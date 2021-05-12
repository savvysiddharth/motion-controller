let cam;

function setup() {
  ctrack.setDisplaySize(500,500);
  createCanvas(500, 500);
  background(0);
  noStroke();
}


function draw() {
  fill(200,70,70);
  ellipse(ctrack.x, ctrack.y, 10, 10);
}

function mouseDragged() {
  fill(200);
  ellipse(mouseX, mouseY, 10, 10);
}