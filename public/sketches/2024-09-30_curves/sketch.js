const points = [];
let currentPoint;

let curveTypeSelector;

function setup() {
  createCanvas(600, 600);
  points.push(createVector(100, 100));
  points.push(createVector(125, 200));
  points.push(createVector(275, 200));
  points.push(createVector(300, 100));

  curveTypeSelector = createSelect();
  curveTypeSelector.position(10, height + 10);
  curveTypeSelector.option("BEZIER");
  curveTypeSelector.option("CURVE");
}

function draw() {
  background("white");

  noFill();
  stroke("black");
  if (curveTypeSelector.value() === "CURVE") {
    curve(
      points[0].x,
      points[0].y,
      points[1].x,
      points[1].y,
      points[2].x,
      points[2].y,
      points[3].x,
      points[3].y,
    );
  } else {
    bezier(
      points[0].x,
      points[0].y,
      points[1].x,
      points[1].y,
      points[2].x,
      points[2].y,
      points[3].x,
      points[3].y,
    );
  }
  noStroke();
  fill(100, 175, 255);
  points.forEach((p) => {
    circle(p.x, p.y, 20);
  });
}

function mousePressed() {
  points.forEach((p) => {
    if (dist(mouseX, mouseY, p.x, p.y) < 10) {
      currentPoint = p;
    }
  });
}

function mouseReleased() {
  currentPoint = null;
}

function mouseDragged() {
  currentPoint.x = mouseX;
  currentPoint.y = mouseY;
}
