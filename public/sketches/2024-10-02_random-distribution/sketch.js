const SIZE = 350;
const data = Array(SIZE);
const xData = Array(SIZE);
const yData = Array(SIZE);
let maxBin = 0;
let maxField = 0;
let running = true;

const uniform = () => Math.floor(random(0, SIZE));
const gauss = () =>
  min(SIZE - 1, max(0, Math.floor(randomGaussian(SIZE / 2, SIZE / 8))));
const ramp = () => Math.floor(max(random(0, SIZE), random(0, SIZE)));
const avg = () => Math.floor((random(0, SIZE) + random(0, SIZE)) / 2);

let randomFunc = uniform;

function drawGraph(data) {
  stroke(0);
  translate(-SIZE / 2, -50);
  rect(0, 0, SIZE, 100);

  for (let i = 0; i < SIZE; i++) {
    line(i, 100, i, map(data[i], 0, maxBin, 100, 0));
  }
}

function drawField(data) {
  stroke(0);
  strokeWeight(2);
  translate(-SIZE / 2, -SIZE / 2);
  rect(0, 0, SIZE, SIZE);
  for (let j = 0; j < SIZE; j++) {
    for (let i = 0; i < SIZE; i++) {
      const value = map(data[i][j], 0, maxField, 255, 0);
      stroke(value);
      point(i, j);
    }
  }
}

function clearData() {
  for (let j = 0; j < SIZE; j++) {
    xData[j] = 0;
    yData[j] = 0;
    for (let i = 0; i < SIZE; i++) {
      data[i][j] = 0;
    }
  }
}

function setup() {
  createCanvas(600, 600);

  const toggle = createCheckbox("Running", true);
  toggle.position(20, height + 20);
  toggle.changed(() => {
    if (toggle.checked()) {
      loop();
      running = true;
    } else {
      noLoop();
      running = false;
    }
  });

  const modeSelector = createSelect();
  modeSelector.position(20, height + 40);
  modeSelector.option("Uniform");
  modeSelector.option("Gaussian");
  modeSelector.option("Ramp");
  modeSelector.option("Average");
  modeSelector.changed(() => {
    clearData();
    switch (modeSelector.value()) {
      case "Uniform":
        randomFunc = uniform;
        break;
      case "Gaussian":
        randomFunc = gauss;
        break;
      case "Ramp":
        randomFunc = ramp;
        break;
      case "Average":
        randomFunc = avg;
        break;
    }
  });

  for (let i = 0; i < SIZE; i++) {
    data[i] = Array(SIZE).fill(0);
  }

  xData.fill(0);
  yData.fill(0);
}

function draw() {
  background(128);

  for (let i = 0; i < 500; i++) {
    const xRand = randomFunc();
    const yRand = randomFunc();

    xData[xRand] += 1;
    yData[yRand] += 1;
    data[xRand][yRand] += 1;
    maxBin = max(maxBin, max(xData[xRand], yData[yRand]));
    maxField = max(maxField, data[xRand][yRand]);
  }

  translate(width / 2, height / 2);

  push();

  drawField(data);
  pop();

  push();
  translate(0, -(SIZE / 2 + 10 + 50));
  drawGraph(xData);
  pop();

  push();
  translate(-(SIZE / 2 + 10 + 50), 0);
  rotate(-PI / 2);
  scale(-1, 1);
  drawGraph(yData);
  pop();
}
