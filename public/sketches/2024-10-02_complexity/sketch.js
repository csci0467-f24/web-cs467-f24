let position;
let hue = 0;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  position = createVector(width / 2, height / 2);
  strokeWeight(20);
}

function draw() {
  // background("white");
  stroke(hue, 100, 100, 5);
  // stroke(random(0,255),random(0,255),random(0,255));
  point(position.x, position.y);

  position.x = max(0, min(position.x + random(-3, 3), width));
  position.y = max(0, min(position.y + random(-3, 3), height));

  hue = (hue + 360 + random(-5, 5)) % 360;
}
