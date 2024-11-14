let rdShader;
let redChannelShader;

let buffer;
let font;

function preload() {
  font = loadFont("./inconsolata.otf");
}

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
  createCanvas(800, 800, WEBGL);

  fetch("shaders/reaction-diffusion.frag")
    .then((response) => response.text())
    .then((data) => {
      rdShader = createFilterShader(data);
      shaderError = checkShaderError(rdShader, data);
      if (shaderError) {
        console.error(shaderError);
      }
    });

  fetch("shaders/recolor-green-blue.frag")
    .then((response) => response.text())
    .then((data) => {
      redChannelShader = createFilterShader(data);
      shaderError = checkShaderError(redChannelShader, data);
      if (shaderError) {
        console.error(shaderError);
      }
    });

  buffer = createFramebuffer({ format: FLOAT });

  buffer.begin();
  background(255, 0, 0);
  fill(0, 0, 255);
  // rect(-100, -50, 200, 100);
  textFont(font);
  textSize(72);
  text("Don't Panic", -200, 0);
  buffer.end();
}

function draw() {
  background(0);

  if (rdShader) {
    buffer.begin();
    for (let i = 0; i < 100; i++) {
      filter(rdShader);
    }
    buffer.end();

    imageMode(CENTER);
    image(buffer, 0, 0);
    filter(redChannelShader);
  }

  // noFill();
  textFont(font);
  textSize(72);
  text("Don't Panic", -200, 0);
}

function mouseDragged(event) {
  // draw a circle where the mouse event happened
  buffer.begin();
  if (event.shiftKey) {
    fill(0, 0, 255);
  } else {
    fill(255, 0, 0);
  }

  circle(mouseX - width / 2, mouseY - height / 2, 10);
  buffer.end();
}
