let offset = 0;
function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  // noLoop();
}

function draw() {
  // background(255);
  // fill(255, 8);
  // noStroke();
  //rect(0,0,width, height);
  noFill();
  stroke(0, 10);
  translate(width / 2, height / 2);

  const radius = (width / 2) * 0.9;
  beginShape();

  for (let i = 0; i < 360; i += 5) {
    const nRadius = radius * (1 + (noise(i, offset) - 0.5) / 5);
    curveVertex(nRadius * cos(i), nRadius * sin(i));
  }
  endShape(CLOSE);
  offset = offset + 0.05;
}
