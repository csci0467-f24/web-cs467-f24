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
    beginShape();
    points.forEach((p, i) => {
      curveVertex(p.x, p.y);
    });
    endShape();
  } else {
    beginShape();
    vertex(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 2; i += 3) {
      bezierVertex(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y,
        points[i + 2].x,
        points[i + 2].y,
      );
    }
    endShape();

    stroke("red");
    for (let i = 1; i < points.length - 2; i += 3) {
      line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
      line(points[i + 1].x, points[i + 1].y, points[i + 2].x, points[i + 2].y);
    }
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

  if (
    !currentPoint &&
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  ) {
    currentPoint = createVector(mouseX, mouseY);
    points.push(currentPoint);
  }
}

function mouseReleased() {
  currentPoint = null;
}

function mouseDragged() {
  currentPoint.x = mouseX;
  currentPoint.y = mouseY;
}
