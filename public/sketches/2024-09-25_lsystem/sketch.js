const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

let system;
let selector;
let numIterations = 4;

const systems = {
  "plant 1": {
    rules: {
      F: "FF",
      X: "F+[[X]-X]-F[-FX]+X",
    },
    seed: "X",
    angle: 25,
    start: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 25,
      angle: -90,
    },
    length: () => CANVAS_HEIGHT / Math.pow(2, numIterations + 2),
  },
  "plant 2": {
    rules: {
      F: "FF",
      X: "F[+X]F[-X]+X",
    },
    seed: "X",
    angle: 20,
    start: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 25,
      angle: -90,
    },
    length: () => CANVAS_HEIGHT / Math.pow(2, numIterations + 2),
  },
  "plant 3": {
    rules: {
      F: "FF-[-F+F+F]+[+F-F-F]",
    },
    seed: "F",
    angle: 22,
    start: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 25,
      angle: -90,
    },
    length: () => CANVAS_HEIGHT / Math.pow(2, numIterations + 2),
  },
  triangle: {
    rules: {
      F: "F-G+F+G-F",
      G: "GG",
    },
    seed: "F-G-G",
    angle: 120,
    start: {
      x: 50,
      y: CANVAS_HEIGHT - 50,
      angle: 0,
    },
    length: () => (CANVAS_WIDTH - 100) / Math.pow(2, numIterations),
  },
  dragon: {
    rules: {
      F: "F+G",
      G: "F-G",
    },
    seed: "F",
    angle: 90,
    start: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      angle: 0,
    },
    length: () => 5,
  },
};

function createLabeledSlider(min, max, value, step, label) {
  const labeledSlider = createDiv();
  createSpan(label).parent(labeledSlider);

  const slider = createSlider(min, max, value, step);
  slider.parent(labeledSlider);
  labeledSlider.position(20, height + 50);
  const valueDisplay = createSpan(value);
  valueDisplay.parent(labeledSlider);

  labeledSlider.changed = (f) => {
    slider.changed(() => {
      valueDisplay.html(slider.value());
      f();
    });
  };

  labeledSlider.value = (arg) => {
    if (arg) {
      slider.value(arg);
    } else {
      return slider.value();
    }
  };
  return labeledSlider;
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  angleMode(DEGREES);
  noLoop();

  selector = createSelect();
  selector.position(20, height + 25);
  Object.keys(systems).forEach((name) => {
    selector.option(name);
  });

  selector.changed(setSystem);
  selector.selected("plant 1");
  setSystem();

  const iterationSlider = createLabeledSlider(
    0,
    15,
    numIterations,
    1,
    "num iterations",
  );
  iterationSlider.position(20, height + 50);
  iterationSlider.changed(() => {
    numIterations = iterationSlider.value();
    redraw();
  });
}

function draw() {
  background("white");
  if (system) {
    console.log(numIterations);

    translate(system.start.x, system.start.y);
    rotate(system.start.angle);
    drawSystem(system, numIterations, system.length(), system.seed);
  }
}

function drawSystem(system, iterations, length, production) {
  for (let i = 0; i < production.length; i++) {
    const letter = production[i];
    if (iterations > 0 && system.rules[letter]) {
      drawSystem(system, iterations - 1, length, system.rules[letter]);
    } else {
      switch (letter) {
        case "F":
          line(0, 0, length, 0);
          translate(length, 0);
          break;
        case "G":
          line(0, 0, length, 0);
          translate(length, 0);
          break;
        case "+":
          rotate(system.angle);
          break;
        case "-":
          rotate(-system.angle);
          break;
        case "[":
          push();
          break;
        case "]":
          pop();
          break;
      }
    }
  }
}

function setSystem() {
  let name = selector.value();
  system = systems[name];
  redraw();
}
