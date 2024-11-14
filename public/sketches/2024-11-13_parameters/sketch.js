const NUM_PARAMETERS = 11;

const sliders = [];

function parameterLookup(name, parameters) {
  switch (name) {
    case "num petals":
      return floor(map(parameters[0], 0, 1, 3, 14));
    case "length":
      return map(parameters[1], 0, 1, 50, 250);
    case "thickness":
      return map(parameters[2], 0, 1, 5, 75);
    case "cp1 angle":
      return map(parameters[3], 0, 1, 0, PI / 2);
    case "cp1 radius":
      return map(parameters[4], 0, 1, 5, 100);
    case "midpoint angle":
      return map(parameters[5], 0, 1, PI / 2, (3 * PI) / 2);
    case "midpoint radius":
      return map(parameters[6], 0, 1, 5, 100);
    case "cp4 angle":
      return map(parameters[7], 0, 1, 0, PI);
    case "cp4 radius":
      return map(parameters[8], 0, 1, 5, 100);
    case "color1":
      return color(parameters[9], 1, 1);
    case "color2":
      return color(parameters[10], 1, 1);
  }
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 1);

  for (let i = 0; i < NUM_PARAMETERS; i++) {
    const slider = createSlider(0, 1, 0.5, 0.001);
    slider.position(width + 5, 10 + i * 20);
    sliders.push(slider);
  }
}

function draw() {
  background(255);
  const parameters = sliders.map((slider) => slider.value());

  push();
  translate(width / 2, height / 2);
  drawFlower(parameters);
  pop();
}

function drawFlower(parameters) {
  const numPetals = parameterLookup("num petals", parameters);

  const angle = TWO_PI / numPetals;
  for (let i = 0; i < numPetals / 2; i++) {
    push();
    rotate(angle * i * 2);
    drawPetal(parameters);
    pop();
  }

  for (let i = 0; i < numPetals / 2; i++) {
    push();
    rotate(angle + angle * i * 2);
    drawPetal(parameters);
    pop();
  }
}

function drawPetal(parameters) {
  const length = parameterLookup("length", parameters);
  const thickness = parameterLookup("thickness", parameters);
  const cp1Angle = parameterLookup("cp1 angle", parameters);
  const cp1Radius = parameterLookup("cp1 radius", parameters);
  const midpointAngle = parameterLookup("midpoint angle", parameters);
  const midpointRadius = parameterLookup("midpoint radius", parameters);
  const cp4Angle = parameterLookup("cp4 angle", parameters);
  const cp4Radius = parameterLookup("cp4 radius", parameters);
  const color1 = parameterLookup("color1", parameters);
  const color2 = parameterLookup("color2", parameters);

  const midpoint = createVector(length / 2, thickness / 2);

  const cp1 = createVector(
    cp1Radius * cos(cp1Angle),
    cp1Radius * sin(cp1Angle),
  );
  const cp2 = createVector(
    midpoint.x + midpointRadius * cos(midpointAngle),
    midpoint.y + midpointRadius * sin(midpointAngle),
  );
  const cp3 = createVector(
    midpoint.x + midpointRadius * cos(midpointAngle + PI),
    midpoint.y + midpointRadius * sin(midpointAngle + PI),
  );
  const cp4 = createVector(
    length + cp4Radius * cos(cp4Angle),
    cp4Radius * sin(cp4Angle),
  );

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, length, 0);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  ctx.fillStyle = gradient;

  beginShape();

  vertex(0, 0);
  bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, midpoint.x, midpoint.y);
  bezierVertex(cp3.x, cp3.y, cp4.x, cp4.y, length, 0);
  bezierVertex(cp4.x, -cp4.y, cp3.x, -cp3.y, midpoint.x, -midpoint.y);
  bezierVertex(cp2.x, -cp2.y, cp1.x, -cp1.y, 0, 0);

  endShape(CLOSE);
}
