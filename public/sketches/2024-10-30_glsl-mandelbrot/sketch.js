/*
Controls:

- mouse click: set new center point
- up arrow / down arrow: zoom in / out
- A / D: move left / right
- W / S: move up / down

*/

let mandelbrotShader;
let scale = 3.0;
let center = [0.0, 0.0];

/*
A function to check if we have any shader errors.
Taken from https://stackoverflow.com/questions/75573386/p5-catch-shader-compilation-errors
*/
function checkShaderError(shaderObj, shaderText) {
  gl = shaderObj._renderer.GL;
  glFragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(glFragShader, shaderText);
  gl.compileShader(glFragShader);
  if (!gl.getShaderParameter(glFragShader, gl.COMPILE_STATUS)) {
    return gl.getShaderInfoLog(glFragShader);
  }
  return null;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  fetch("shaders/mandelbrot.frag")
    .then((response) => response.text())
    .then((data) => {
      mandelbrotShader = createFilterShader(data);
      shaderError = checkShaderError(mandelbrotShader, data);
      if (shaderError) {
        console.error(shaderError);
      }
    });
}

function draw() {
  if (mandelbrotShader) {
    if (keyIsDown(UP_ARROW)) {
      scale *= 0.9;
    } else if (keyIsDown(DOWN_ARROW)) {
      scale *= 1.1;
    } else if (keyIsDown("A".charCodeAt(0))) {
      center[0] -= scale / 20;
    } else if (keyIsDown("D".charCodeAt(0))) {
      center[0] += scale / 20;
    } else if (keyIsDown("W".charCodeAt(0))) {
      center[1] -= scale / 20;
    } else if (keyIsDown("S".charCodeAt(0))) {
      center[1] += scale / 20;
    }

    mandelbrotShader.setUniform("scale", scale);
    mandelbrotShader.setUniform("center", center);

    filter(mandelbrotShader);
  }
}

function mouseClicked() {
  const newX = map(
    mouseX,
    0,
    width,
    center[0] - scale / 2,
    center[0] + scale / 2,
  );
  const newY = map(
    mouseY,
    0,
    height,
    center[1] - scale / 2,
    center[1] + scale / 2,
  );

  center = [newX, newY];
}

function keyPressed() {
  if (key === "r") {
    scale = 3.0;
    center = [0.0, 0.0];
  }
}
