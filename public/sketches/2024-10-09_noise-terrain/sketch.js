const CELLS = 75;
let input;

let lodSlider;

let falloffSlider;

let terrain = Array(CELLS);
let angle = 0;

function setup() {
  createCanvas(500, 500, WEBGL);
  perspective(PI / 3, width / height, 0.1, 300);

  for (let i = 0; i < CELLS; i++) {
    terrain[i] = Array(CELLS);
  }

  input = createLabeledInput(".06", "Scale");
  input.position(10, height + 20);
  input.changed(update);

  lodSlider = createLabeledSlider(1, 8, 4, 1, "Octaves");
  lodSlider.position(10, height + 70);
  lodSlider.changed(update);

  falloffSlider = createLabeledSlider(0, 1, 0.5, 0.01, "Falloff");
  falloffSlider.position(10, height + 120);
  falloffSlider.changed(update);

  update();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(0.1);
  noFill();

  camera(0, CELLS * 0.8, 35, 0, 0, 0, 0, 1, 0);
  rotateZ(angle);
  angle += 0.01;
  const cx = CELLS / 2;
  const cy = CELLS / 2;

  for (let j = 0; j < CELLS - 1; j++) {
    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i < CELLS; i++) {
      vertex(cx - i, cy - j, terrain[i][j]);
      vertex(cx - i, cy - (j + 1), terrain[i][j + 1]);
    }
    endShape();
  }
}

function update() {
  terrain = growTerrain(
    terrain,
    parseFloat(input.value()),
    lodSlider.value(),
    falloffSlider.value(),
    20,
  );
  redraw();
}

function growTerrain(terrain, scale, lod, falloff, maxHeight) {
  noiseDetail(lod, falloff);
  let s = maxHeight;
  let b = 0;
  for (let i = 0; i < terrain.length; i++) {
    for (let j = 0; j < terrain[i].length; j++) {
      terrain[i][j] = noise(i * scale, j * scale) * maxHeight;
      s = min(s, terrain[i][j]);
      b = max(b, terrain[i][j]);
    }
  }
  print(s, b);
  return terrain;
}
