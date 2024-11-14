let rdShader;
let effectShader;

let buffer;
let capture;

let textureCreated = false;

let count = 0;

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
  capture = createCapture(VIDEO);
  capture.hide();

  fetch("shaders/reaction-diffusion.frag")
    .then((response) => response.text())
    .then((data) => {
      rdShader = createFilterShader(data);
      shaderError = checkShaderError(rdShader, data);
      if (shaderError) {
        console.error(shaderError);
      }
    });

  fetch("shaders/recolor2.frag")
    .then((response) => response.text())
    .then((data) => {
      effectShader = createFilterShader(data);
      shaderError = checkShaderError(effectShader, data);
      if (shaderError) {
        console.error(shaderError);
      }
    });

  buffer = createFramebuffer({ format: FLOAT });

  buffer.begin();
  background(255, 0, 0);
  fill(0, 0, 255);
  circle(0, 0, 50);
  buffer.end();
}

function draw() {
  background(0);

  if (rdShader && !textureCreated) {
    buffer.begin();
    for (let i = 0; i < 5; i++) {
      filter(rdShader);
      count++;
    }
    buffer.end();
    textureCreated = count > 30000;
  }

  if (effectShader) {
    imageMode(CENTER);
    image(buffer, 0, 0);
    effectShader.setUniform("rotation", frameCount * 0.005);
    effectShader.setUniform("tex1", capture);
    filter(effectShader);
  }
}
