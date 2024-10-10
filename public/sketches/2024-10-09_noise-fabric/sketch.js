let step = 1;
let scale = 0.03;
let amplitude = 2;

function setup() {
  createCanvas(640, 480);
  noFill();

  const scaleSlider = createLabeledSlider(0, 0.1, scale, 0.001, "Scale");
  scaleSlider.position(10, height + 20);
  scaleSlider.changed(() => (scale = scaleSlider.value()));

  const amplitudeSlider = createLabeledSlider(
    0,
    10,
    amplitude,
    0.1,
    "Amplitude",
  );
  amplitudeSlider.position(10, height + 70);
  amplitudeSlider.changed(() => (amplitude = amplitudeSlider.value()));

  const stepSlider = createLabeledSlider(0.1, 5, step, 0.1, "Step");
  stepSlider.position(10, height + 120);
  stepSlider.changed(() => (step = stepSlider.value()));
}

function draw() {
  background(255);
  stroke(0, 32);

  for (let j = 0; j < height; j += 2) {
    let y = j;

    beginShape();
    for (let x = -30; x < width; x += step) {
      const n =
        amplitude *
        (noise(x * scale, j * scale, frameCount * scale * 0.1) - 0.5);
      y += n;
      vertex(x, y);
    }
    endShape();
  }
}
