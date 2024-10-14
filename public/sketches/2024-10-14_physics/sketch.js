// let ball;
const balls = [];

const waterline = 400;

function setup() {
  createCanvas(600, 600);

  let ball = new Ball(100, 100, 20, color(255, 0, 100));
  balls.push(ball);
  ball = new Ball(400, 100, 40, color(100, 0, 255));
  balls.push(ball);
}

function draw() {
  background(255);
  fill("white");
  rect(0, 0, width, height);

  // gravity
  const g = createVector(0, 1);
  balls.forEach((b) => {
    b.applyForce(p5.Vector.mult(g, b.mass));
  });
  // ball.applyForce(g);

  // wind
  if (mouseIsPressed) {
    const mouse = createVector(mouseX, mouseY);
    balls.forEach((b) => {
      const wind = p5.Vector.sub(b.position, mouse);
      wind.normalize();
      wind.mult(2);

      b.applyForce(wind);
    });
    // ball.applyForce(wind);
  }

  // drag
  const dragCoefficient = 0.1;
  balls.forEach((b) => {
    if (b.position.y + b.radius > waterline) {
      const drag = b.velocity.copy().normalize();
      drag.mult(b.velocity.magSq());
      drag.mult(-dragCoefficient);

      b.applyForce(drag);
    }
  });

  balls.forEach((b) => {
    b.update();
  });
  balls.forEach((b) => {
    b.draw();
  });
  // ball.update();
  // ball.draw();

  fill(100, 200, 255, 50);
  rect(0, waterline, width, height - waterline);
}

class Ball {
  constructor(x, y, radius, color) {
    this.radius = radius;
    this.color = color;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = radius / 10;
  }

  draw() {
    fill(this.color);
    circle(this.position.x, this.position.y, this.radius * 2);
  }

  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
    if (
      this.position.x + this.radius > width ||
      this.position.x - this.radius < 0
    ) {
      this.velocity.x *= -0.9;
      this.position.x = constrain(
        this.position.x,
        this.radius,
        width - this.radius,
      );
    }
    if (
      this.position.y + this.radius > height ||
      this.position.y - this.radius < 0
    ) {
      this.velocity.y *= -0.9;
      this.position.y = constrain(
        this.position.y,
        this.radius,
        height - this.radius,
      );
    }
  }
}
