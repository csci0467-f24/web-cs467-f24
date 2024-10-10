const CELLS = 200;
let input;

let offsetX = 0;
let offsetY = 0;
let lodSlider;
let falloffSlider;

let c1;
let c2;
let c3;

function setup() {
  createCanvas(500, 500);
  // noLoop();
  noStroke();

  input = createLabeledInput("0.008", "Scale");
  input.position(10, height + 20);

  lodSlider = createLabeledSlider(1, 8, 4, 1, "Octaves");
  lodSlider.position(10, height + 70);

  falloffSlider = createLabeledSlider(0, 1, 0.5, 0.01, "Falloff");
  falloffSlider.position(10, height + 120);

  c1 = color(255, 255, 0);
  c2 = color(255, 0, 0);
  c3 = color(25, 0, 0);
}

function draw() {
  background(255);

  const blockWidth = width / CELLS;
  const blockHeight = height / CELLS;
  const scale = parseFloat(input.value());

  const t = frameCount * 0.01;
  noiseDetail(lodSlider.value(), falloffSlider.value());
  for (let i = 0; i < CELLS; i++) {
    for (let j = 0; j < CELLS; j++) {
      const n = noise((i + offsetX) * scale, (j + offsetY) * scale, t);
      fill(lerpColor(lerpColor(c3, c2, n * 2), c1, (n - 0.5) * 2));
      rect(i * blockWidth, j * blockHeight, blockWidth + 1, blockHeight + 1);
    }
  }
}

function mouseDragged() {
  if (
    mouseY < height &&
    mouseX < width &&
    pmouseX < width &&
    pmouseY < height
  ) {
    offsetX += map(pmouseX - mouseX, 0, width, 0, CELLS);
    offsetY += map(pmouseY - mouseY, 0, height, 0, CELLS);
  }
}
