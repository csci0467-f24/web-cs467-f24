function setup() {
  createCanvas(900, 900);
  noStroke();

  colorMode(HSB);
  noLoop();
}

function draw() {
  background(0);

  for (let i = 0; i < 100; i++) {
    const x = random(0, width);
    const y = random(0, height);
    const diameter = random(100, 400);
    const hue = random(100, 250);
    const saturation = random(30, 70);
    const brightness = random(0, 100);
    const alpha = random(0.1, 0.7);

    fill(hue, saturation, brightness, alpha);
    circle(x, y, diameter);
  }
}
