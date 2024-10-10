const CELLS = 300;
let input;

let offsetX = 0;
let offsetY = 0;
let lodSlider;
let falloffSlider;

function setup() {
  createCanvas(500, 500);

  noStroke();

  input = createLabeledInput("0.01", "Scale");
  input.position(10, height + 20);

  lodSlider = createLabeledSlider(1, 8, 4, 1, "Octaves");
  lodSlider.position(10, height + 70);

  falloffSlider = createLabeledSlider(0, 1, 0.5, 0.01, "Falloff");
  falloffSlider.position(10, height + 120);
}

function draw() {
  background(255);
  offsetX += 0.2;

  const blockWidth = width / CELLS;
  const blockHeight = height / CELLS;
  const scale = parseFloat(input.value());
  noiseDetail(lodSlider.value(), falloffSlider.value());
  const sky = color("#0d55AF");
  const cloud = color("white");
  for (let i = 0; i < width; i += blockWidth) {
    for (let j = 0; j < height; j += blockHeight) {
      const n = noise((i + offsetX) * scale, (j + offsetY) * scale);
      fill(lerpColor(cloud, sky, n));
      rect(i, j, blockWidth, blockHeight);
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
