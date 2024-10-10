let offsetX = 0;
let input;
let lodSlider;
let falloffSlider;

const amplitude = 300;

function setup() {
  createCanvas(600, 400);

  input = createLabeledInput("1", "Scale");
  input.position(10, height + 20);

  lodSlider = createLabeledSlider(1, 8, 1, 1, "Octaves");
  lodSlider.position(10, height + 70);

  falloffSlider = createLabeledSlider(0, 1, 0.5, 0.01, "Falloff");
  falloffSlider.position(10, height + 120);
}

function draw() {
  background(255);

  const scale = parseFloat(input.value());
  noiseDetail(lodSlider.value(), falloffSlider.value());

  beginShape();
  for (let i = 0; i < width; i++) {
    vertex(
      i,
      noise((i + offsetX) * scale) * amplitude + (height / 2 - amplitude / 2),
    );
  }
  endShape();
}

function mouseDragged() {
  if (
    mouseY < height &&
    mouseX < width &&
    pmouseX < width &&
    pmouseY < height
  ) {
    offsetX += pmouseX - mouseX;
  }
}
