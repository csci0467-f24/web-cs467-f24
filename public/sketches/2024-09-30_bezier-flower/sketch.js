let x0 = 0;
let x1 = 0;
let angle = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background("#fafafa");

  translate(width / 2, height / 2);

  const numPetals = 20;
  fill(angle, 60, 65, 25);
  noStroke();
  drawPetals(numPetals);

  stroke(0);
  noFill();
  drawPetals(numPetals);

  x0 = 100 * cos(angle);
  x1 = 100 * sin(angle);
  angle = (angle + 0.1) % 360;
}

function drawPetals(numPetals) {
  for (let i = 0; i < numPetals; i++) {
    beginShape();
    vertex(0, 0);
    bezierVertex(x0, 50, x1, 100, 0, 200);
    bezierVertex(-x1, 100, -x0, 50, 0, 0);
    endShape();

    // uncomment to show control points
    // push()
    // strokeWeight(4)
    // stroke("red");
    // point(x0, 50)
    // point(x1, 100)
    // stroke("blue");
    // point(-x0, 50);

    // point(-x1, 100)
    // pop();

    rotate(360 / numPetals);
  }
}
