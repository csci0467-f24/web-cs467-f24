const CELLS = 200;
let input;

let offsetX = 0;
let offsetY = 0;
let lodSlider;
let falloffSlider;
function setup() {
  createCanvas(500, 500);

  noStroke();
  input = createLabeledInput("1", "Scale");
  input.position(10, height + 20);

  lodSlider = createLabeledSlider(1, 8, 4, 1, "Octaves");
  lodSlider.position(10, height + 70);

  falloffSlider = createLabeledSlider(0, 1, 0.5, 0.01, "Falloff");
  falloffSlider.position(10, height + 120);
}

function draw() {
  background(255);

  const blockWidth = width / CELLS;
  const blockHeight = height / CELLS;
  const scale = parseFloat(input.value());
  noiseDetail(lodSlider.value(), falloffSlider.value());

  for (let i = 0; i < CELLS; i++) {
    for (let j = 0; j < CELLS; j++) {
      fill(noise((i + offsetX) * scale, (j + offsetY) * scale) * 255);
      rect(i * blockWidth, j * blockHeight, blockWidth, blockHeight);
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