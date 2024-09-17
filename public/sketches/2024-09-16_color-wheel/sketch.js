const NUM_SLICES = 50;
let sliceSlider;

function setup() {
  createCanvas(600, 600);
  // noLoop();
  noStroke();
  colorMode(HSB, TWO_PI, 100, 100);

  sliceSlider = createSlider(3, 200, NUM_SLICES, 1);
  sliceSlider.position(10, height + 10);
}

function draw() {
  background(255);

  const slices = sliceSlider.value();
  const angle = TWO_PI / slices;
  const radius = min(width, height) * 0.475;
  const cx = width / 2;
  const cy = height / 2;

  beginShape(TRIANGLE_FAN);
  vertex(cx, cy);
  for (let i = 0; i <= slices; i++) {
    fill(i * angle, 100, 100);
    vertex(cx + radius * cos(i * angle), cy + radius * sin(i * angle));
  }
  endShape();
}
