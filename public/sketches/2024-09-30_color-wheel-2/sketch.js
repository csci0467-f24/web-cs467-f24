const NUM_SLICES = 50;
let sliceSlider;
let modeSelecter;
let showStroke;

function setup() {
  createCanvas(600, 600);
  // noLoop();
  noStroke();
  colorMode(HSB, TWO_PI, 100, 100);
  sliceSlider = createSlider(3, 200, NUM_SLICES, 1);
  sliceSlider.position(10, height + 10);

  modeSelecter = createSelect();
  modeSelecter.position(10, height + 30);
  modeSelecter.option("DEFAULT");
  modeSelecter.option("PIE");
  modeSelecter.option("CHORD");
  modeSelecter.option("OPEN");

  showStroke = createCheckbox("Stroke", false);
  showStroke.position(10, height + 50);
}

function draw() {
  background("white");

  const slices = sliceSlider.value();
  const cx = width / 2;
  const cy = height / 2;
  const offset = TWO_PI / slices;
  const mode = pickMode(modeSelecter.value());

  if (showStroke.checked()) {
    stroke("black");
    strokeWeight(3);
  } else {
    noStroke();
  }

  for (let angle = 0; angle < TWO_PI + 0.1; angle += offset) {
    fill(angle, 100, 100);
    arc(cx, cy, width - 20, height - 20, angle, angle + offset, mode);
  }
}

function pickMode(mode) {
  switch (mode) {
    case "PIE":
      return PIE;
    case "CHORD":
      return CHORD;
    case "OPEN":
      return OPEN;
    default:
      return;
  }
}
