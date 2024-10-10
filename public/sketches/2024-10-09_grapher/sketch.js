let checkbox;
let f;

function drawAxis(w, h, scaleW) {
  stroke(64, 255, 64);
  fill(64, 255, 64);

  // y axis
  line(0, 0, 0, h);
  for (let i = 0; i <= 1; i += 0.25) {
    const pos = h * i;
    push();
    translate(0, pos);
    scale(1, -1);
    line(-10, 0, 0, 0);
    noStroke();
    text(i, -40, 5);
    pop();
  }

  // x axis
  line(0, 0, w, 0);
  for (let i = 0; i <= scaleW; i += 1) {
    const pos = (w / scaleW) * i;
    push();
    translate(pos, 0);

    line(0, 0, 0, -10);
    scale(1, -1);
    noStroke();
    text(i, -5, 30);
    pop();
  }
}

function drawLine(w, h, scaleW, increment, withBlur, f) {
  const xScale = w / scaleW;
  stroke(255, 255, 0);
  noFill();
  const points = [];
  for (let i = 0; i <= scaleW; i += increment) {
    points.push({ x: i * xScale, y: f(i) * h });
  }

  const drawShape = () => {
    beginShape(POINTS);
    points.forEach(({ x, y }) => {
      vertex(x, y);
    });
    endShape();
  };
  if (withBlur) {
    strokeWeight(5);
    drawShape();
    push(); // filter appears to undo our transformations so we guard the state
    filter(BLUR, 6);
    pop();
  }

  strokeWeight(1);
  drawShape();
}

function setFunction(mode) {
  switch (mode) {
    case "Fake random":
      f = fakeRandom;
      break;
    case "Built-in random()":
      f = builtinRandom;
      break;
    case "Simplistic noise":
      f = noise1;
      break;
    case "Hermite interpolation noise":
      f = noise2;
      break;
    case "Perlin noise":
      f = noise3;
      break;
    case "Ramp":
      f = ramp;
      break;
    case "Sine":
      f = sineTest;
      break;
  }
  redraw();
}

function setup() {
  createCanvas(640, 300);

  checkbox = createCheckbox("Blur", false);
  checkbox.position(10, height + 20);
  checkbox.changed(redraw);

  const modeSelector = createSelect();
  modeSelector.position(20, height + 40);
  modeSelector.option("Sine");
  modeSelector.option("Fake random");
  modeSelector.option("Built-in random()");
  modeSelector.option("Ramp");
  modeSelector.option("Simplistic noise");
  modeSelector.option("Hermite interpolation noise");
  modeSelector.option("Perlin noise");

  noLoop();
  modeSelector.changed(() => setFunction(modeSelector.value()));
  setFunction(modeSelector.value());
}

function draw() {
  background(0);
  push();
  translate(50, 200);
  scale(1, -1);

  drawLine(500, 190, 10, 0.001, checkbox.checked(), f);
  drawAxis(500, 190, 10);
  pop();
}

/* Random and noise functions */

const sineTest = (i) => (sin(i) + 1) / 2;

const fakeRandom = (i) => Math.abs((sin(i) * 10000) % 1);

const ramp = (i) => max(random(), random());

const builtinRandom = () => random();

const noise1 = (i) => {
  const f = i % 1;
  const x = Math.floor(i);

  return lerp(fakeRandom(x), fakeRandom(x + 1), f);
};

const noise2 = (i) => {
  const f = i % 1;
  const u = (3 - 2 * f) * f * f; // Hermite interpolation "smoothstep"
  const x = Math.floor(i);

  return lerp(fakeRandom(x), fakeRandom(x + 1), u);
};

const noise3 = (i) => {
  const f = i % 1;

  const u = ((6 * f - 15) * f + 10) * f * f * f; // Perlin smooth step
  const x = Math.floor(i);

  return lerp(fakeRandom(x), fakeRandom(x + 1), u);
};
