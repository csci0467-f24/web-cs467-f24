function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background("white");
  fill("black");

  noStroke();
  for (var i = 0; i < 27; i++) {
    const x = (i * width) / 27;
    const w = map(i, 0, 26, width / 27 - 2, 4);
    rect(x, 0, w, height);
  }

  blendMode(DIFFERENCE);
  fill("white");

  ellipseMode(CENTER);
  circle(width / 2, height / 2, (4 * height) / 5);
}
