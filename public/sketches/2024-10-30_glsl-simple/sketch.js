let colorShader, checkerboardShader;

let shaderChoice;

function setup() {
  createCanvas(600, 600);

  shaderChoice = createSelect();
  shaderChoice.option("Color");
  shaderChoice.option("Checkerboard");
  shaderChoice.position(10, height + 10);

  fetch("shaders/checkerboard.frag")
    .then((response) => response.text())
    .then((data) => {
      checkerboardShader = createFilterShader(data);
    });

  fetch("shaders/basic-color.frag")
    .then((response) => response.text())
    .then((data) => {
      colorShader = createFilterShader(data);
    });
}

function draw() {
  background(255);
  if (colorShader && checkerboardShader) {
    let shaderObj =
      shaderChoice.value() === "Color" ? colorShader : checkerboardShader;
    filter(shaderObj);
  }
}
