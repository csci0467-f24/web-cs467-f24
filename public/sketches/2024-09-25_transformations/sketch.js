/**
 * Transformation examples
 *
 * To make this easier to navigate, I added a selector to allow you to switch between the examples.
 *
 */

let angle = 0;
let selector;

const examples = {
  translateExample: translateExample,
  scaleExample: scaleExample,
  rotateExample: rotateExample,
  shearExample: shearExample,
  rotateInPlace: rotateInPlace,
  centerCoordinates: centerCoordinates,
  mystery: mystery,
};

function setup() {
  createCanvas(600, 600);
  // noLoop();
  selector = createSelect();
  selector.position(20, height + 25);
  for (let key in examples) {
    selector.option(key);
  }
}

function draw() {
  background(200);
  examples[selector.value()]();
}

function rotateInPlace() {
  rectMode(CENTER);
  fill("red");
  rect(200, 200, 125, 100);
  push();
  angleMode(DEGREES);
  translate(200, 200);
  rotate(45);
  fill("blue");
  rect(0, 0, 125, 100);
  pop();

  // rotate(-45);
  // translate(-200, -200);
  // fill("green");
  rect(50, 50, 75, 25);
}

function centerCoordinates() {
  translate(width / 2, height / 2);
  scale(1, -1);
  fill("red");
  rect(0, 0, 200, 100);
  fill("blue");
  rect(0, 100, 200, 100);
}

function mystery() {
  fill("white");
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  angle += 0.1;
  push();
  rotate(-45);
  rect(0, 0, 150, 25);
  translate(150, 0);
  rotate(45);
  rect(0, 0, 150, 25);
  pop();
  push();
  scale(-1, 1);
  rotate(-45);
  rect(0, 0, 150, 25);
  translate(150, 0);
  rotate(45);
  rect(0, 0, 150, 25);
  pop();
  pop();
}

function translateExample() {
  fill("red");
  circle(80, 80, 80);

  translate(80, 80);
  fill("blue");
  circle(0, 0, 40);
  circle(80, 80, 40);
}

function scaleExample() {
  fill("red");
  rect(0, 0, 100, 75);

  scale(2, 2);
  fill("blue");
  rect(0, 75, 100, 75);
}

function rotateExample() {
  fill("red");
  rect(200, 200, 125, 100);

  angleMode(DEGREES);

  rotate(45);
  fill("blue");
  rect(200, 200, 125, 100);
}

function shearExample() {
  fill("red");
  angleMode(DEGREES);
  shearX(45);
  rect(0, 0, 125, 100);
}
